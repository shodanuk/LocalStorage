(function() {
  var testForm;

  function doTests() {
    var logContainer = $('log'),
        log = new Element('ul');

    logContainer.update(log);

    log.insert('<li class="good">Starting tests...</li>');
    log.insert('<li class="good">Testing for localStorage availability</li>');

    if (LocalStorage.isAvailable) {
      var events = ['LocalStorage:setItem', 'LocalStorage:getItem', 'LocalStorage:clear', 'LocalStorage:removeItem'],
          d = new Date(),
          items = {
            item1: "I am item 1",
            item2: "I am item 2",
            item3: "I am item 3",
            item4: "I am item 4",
            item5: "I am item 5",
            item6: "I am item 6",
            item7: "I am item 7",
            item8: "I am item 8",
            item9: "I am item 9",
            item10: "I am item 10"
          };

      log.insert('<li class="good">localStorage is avalable, now setting event listeners...</li>');

      events.each(function(eventType){
        Event.observe(document, eventType, function(e){
          log.insert('<li class="good">'+e.eventName+' event fired!<br />Memo: '+Object.toJSON(e.memo)+'</li>');
        });
      });

      LocalStorage.set('timestamp', d.toString());
      LocalStorage.set('items', items);

      log.insert('<li class="good">timestamp = '+LocalStorage.get('timestamp')+'</li>');
      log.insert('<li class="good">items = '+LocalStorage.get('items')+'</li>');
    } else {
      log.insert('<li class="error">localStorage not available. Bailing out...</li>');
    }

    log.insert('<li class="good">Tests finished.</li>');
  }

  function saveTest(e) {
    e.stop();
    if ( $F('ls-key') || $F('ls-value') ) {
      LocalStorage.set($F('ls-key'), $F('ls-value'));
      testForm.insert({ top: '<p class="good msg">Data saved in localStorage. Please remember the key you just entered then restart browser and go to demo/retrieve.html to test persistence.</p>' })
    } else {
      testForm.insert({ top: '<p class="error msg">Please fill in both fields</p>' });
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
    doTests();
    $('test-form').observe('submit', saveTest);

    console.log(LocalStorage.dump());
    console.log(LocalStorage.serialize());
  });
}());