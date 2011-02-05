(function() {
  var testForm;

  function getData(e) {
    var testForm = $('test-form'), formKey= $F('ls-key');
    e.stop();

    if (formKey) {
      var lsKey = LocalStorage.get(formKey);

      if (lsKey) {
        $('log').insert("<li class='good'>Key: "+formKey+"<br/>Value: "+lsKey+"</div>");
      } else {
        $('log').insert({ top: '<li class="error">Key: '+formKey+' not found.</li>' });
      }
    } else {
      testForm.insert({ top: '<p class="error">Please enter your key.</p>' });
    }
  }

  Event.observe(document, "dom:loaded", function() {
    if (Prototype.Browser.IE && window.location.protocol != 'http:') {
      var warning = new Element('div', { id: 'warning' }).addClassName('error msg').update('Sorry, localStorage only works on the http or https url protocol in IE');
      Element.insert(document.body, warning);
    }
  });

  Event.observe(document, "LocalStorage:ready", function() {
    testForm = $('test-form');
    testForm.observe('submit', getData);
  });
}());