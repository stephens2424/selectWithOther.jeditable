$(document).ready(function () {
  $.editable.addInputType('selectWithOther',{
    element : $.editable.types.select.element,
    content : function (data, settings, original) {
      /* If it is string assume it is json. */
      if (String == data.constructor) {      
          eval ('var json = ' + data);
      } else {
      /* Otherwise assume it is a hash already. */
          var json = data;
      }
      var currentlyOnOther = true;
      for (var key in json) {
          if (!json.hasOwnProperty(key)) {
              continue;
          }
          if ('selected' == key) {
              continue;
          }
          if (json[key] === original.revert) {
            currentlyOnOther = false;
          }
          var option = $('<option />').val(key).append(json[key]);
          $('select', this).append(option);    
      }
      if (currentlyOnOther) {
        var currentOther = $('<option />').val('selected').append(original.revert);
        $('select',this).append(currentOther);
      }
      var other = $('<option />').val('other').append('Other');
      $('select',this).append(other);
      $('select',this).change(function () {
        if ($(this).val() == 'other') {
          $(this).replaceWith($.editable.types.text.element(settings,original));
        }
      });
      /* Loop option again to set selected. IE needed this... */ 
      $('select', this).children().each(function() {
          if ($(this).val() == json['selected'] || 
              $(this).text() == $.trim(original.revert)) {
                  $(this).attr('selected', 'selected');
          }
      });
    }
  });
  var myOpts = {"opt1":"Editable text one","opt2":"Editable text two"}
  $('#testDiv').editable(function (value) {
    return myOpts[value];
  },{
    type:'selectWithOther',
    submit:'save',
    data:myOpts
  });
});
