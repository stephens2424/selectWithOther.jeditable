$(function () {
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
      /* Begin with assumption that we are on an 'other' item */
      var currentlyOnOther = true;
      for (var key in json) {
          if (!json.hasOwnProperty(key)) {
              continue;
          }
          if ('selected' == key) {
              continue;
          }
          /* If json entry is the original form, not on other */
          if (json[key] === original.revert) {
            currentlyOnOther = false;
          }
          var option = $('<option />').val(key).append(json[key]);
          $('select', this).append(option);    
      }
      if (currentlyOnOther) {
        var currentOther = $('<option />').val('currentOther').append(original.revert).prop('selected',true);
        $('select',this).append(currentOther);
      }
      var other = $('<option />').val('other').append('Other');
      $('select',this).append(other);
      var $select = $('select',this);
      var $form = $select.closest('form')
      $('select',this).change(function () {
        $select = $(this);
        if ($select.val() == 'other') {
          var $text = $.editable.types.text.element(settings,original);
          switchHandlers('blur',$select,$text);
          switchHandlers('keydown',$select,$text);
          $select.before($text);
          $select.hide();
        }
      });
      /* Loop option again to set selected. IE needed this... */ 
      $('select', this).children().each(function() {
          if ($(this).val() == json['selected'] || 
              $(this).text() == $.trim(original.revert)) {
                  $(this).attr('selected', 'selected');
          }
      });
    },
    submit : function (settings, self) {
      var $form = $(this);
      var $select = $('select',$form);
      if ($form.find('input').length > 0) {
        if ($("option [value='currentOther']",$select).length < 1) {
          var $currentOther = $('<option />').val('currentOther');
          $select.append($currentOther);
        }
        var currentText = $form.find('input').val();
        $form.find('input').replaceWith($select);
        $("option[value='currentOther']",$select).text(currentText);
        $("option[value='currentOther']",$select).prop('selected',true);
        $("option[value='currentOther']",$select).val(currentText);
      }
      return true;
    }
  });
  function switchHandlers(event,$origin,$destination) {
    for (var i in $origin.data('events')[event]) {
      var handler = $origin.data('events')[event][i].handler;
      $origin.unbind(event,handler);
      $destination.bind(event,handler);
    }
  }
});