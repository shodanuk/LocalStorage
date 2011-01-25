Event.observe(document, "dom:loaded", function() {
  if (Prototype.Browser.IE && window.location.protocol != 'http:') {
    var warning = new Element('div', { id: 'warning' }).update('Sorry, localStorage only works on the http or https url protocol in IE');
    Element.insert(document.body, warning);
  }
});

Event.observe(document, "LocalStorage:ready", function() {

  var logContainer = $('log'),
      log = new Element('ul');

  logContainer.update(log);

  log.insert('<li>Starting tests...</li>');
  log.insert('<li>Testing for localStorage availability</li>');

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

    log.insert('<li>localStorage is avalable, now setting event listeners...</li>');

    events.each(function(eventType){
      Event.observe(document, eventType, function(e){
        log.insert('<li>'+e.eventName+' event fired!<br />Memo: '+Object.toJSON(e.memo)+'</li>');
      });
    });

    LocalStorage.set('timestamp', d.toString());
    LocalStorage.set('items', items);

    log.insert("<li>timestamp = "+LocalStorage.get('timestamp')+"</li>");
    log.insert("<li>items = "+LocalStorage.get('items')+"</li>");
  } else {
    log.insert('<li class="fail">localStorage not available. Bailing out...</li>');
  }

  log.insert('<li>Tests finished.</li>');
});