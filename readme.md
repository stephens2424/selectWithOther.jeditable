#selectWithOther.jeditable

This file adds a type to [Jeditable](http://www.appelsiini.net/projects/jeditable), a select box to be populated with json key-pairs for options, but with an "Other" option automatically appended to the list and implemented for use. Selecting "Other" will replace the select-box with text-box. Upon submitting, the content of the text-box becomes the basic text displayed and the same string becomes another automatic option inside the select-box, if editing is initiated again.

##Details of use

There are a few important things to recognize in using this code.

1. Create an options object. This, of course, does not have to be hard coded like this. Confusingly, for each key-value pair, the key is the value attribute of the option element it defines and the value.

    ```javascript
      var myOpts = {"opt1":"Editable text one","opt2":"Editable text two"};
    ```

    So this will produce a select with the following HTML (ignoring the "Other" for the moment):

    ```html
      <select>
        <option value="opt1">Editable text one</option>
        <option value="opt2">Editable text two</option>
      </select>
    ```
    
2. Initialize jeditable on the proper element using 'selectWithOther' as the type. 

    ```javascript
    $('#testDiv').editable(function (value) {
      if (myOpts[value]) return myOpts[value];
      return value;
    },{
      type:'selectWithOther',
      submit:'save',
      data:myOpts
    });
    ```

3. The return part of the callback function is particularly important to note.

    ```javascript
      if (myOpts[value]) return myOpts[value];
      return value;
    ```

    The return value of the callback is the string that will be displayed in place of the form. `value` will either be the key of the key-value pair (so the value attribute of the option element) or the value of the text-box if "Other" had been selected.

##Demo

You may find a live demonstration at http://stephensearles.com/selectWithOther.

##About

This code is dual licensed under both GPL and MIT licenses. 