$(document).ready(function () {
  var myOpts = {"opt1":"Editable text one","opt2":"Editable text two"}
  $('#testDiv').editable(function (value) {
    return myOpts[value];
  },{
    type:'selectWithOther',
    submit:'save',
    data:myOpts
  });
});
