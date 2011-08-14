$(document).ready(function () {
  var myOpts = {"opt1":"Editable text one","opt2":"Editable text two"}
  $('#testDiv').editable(function (value) {
    if (myOpts[value]) return myOpts[value];
    return value;
  },{
    type:'selectWithOther',
    submit:'save',
    data:myOpts
  });
});
