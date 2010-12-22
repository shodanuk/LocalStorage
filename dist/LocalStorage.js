// Prototype version
var LocalStorage = function(){
  var isAvailable = false,
      ls = null;

  function checkAvailable(){
    if(typeof Modernizr != 'undefined' && Modernizr.localstorage){
      return true;
    }else{
      try {
        return ('localStorage' in window && window['localStorage'] !== null);
      } catch (e) {
        // no local storage support :(
      }
    }
    return false;
  }

  function clearAll(){
    fireEvent('clear');
    ls.clear();
  }

  function fireEvent(event, key, val){
    var memo = {};
    if(typeof key != 'undefined' && typeof val != 'undefined') memo[key] = val;
    Event.fire(window, "LocalStorage:"+event, memo);
  }

  function key(idx){
    return ls.key(idx);
  }

  function get(key){
    fireEvent('getItem');
    var item = ls.getItem(key);
    if(item != null){
      return item.isJSON() ? item.evalJSON() : item;
    }else{
      return null;
    }
  }

  function remove(key){
    fireEvent('removeItem', key, val);
    ls.removeItem(key);
  }

  function set(key, val){
    fireEvent('setItem', key, val);
    if(typeof val == 'object'){
      val = Object.toJSON(val);
    }
    ls.setItem(key, val);
  }

  function setup(){
    isAvailable = true;
    ls = window.localStorage;


  }

  // if localStorage is available, off we go!
  document.observe("dom:loaded", function(){
    if(checkAvailable()){
      setup();
    }
  });

  return {
    clearAll: clearAll,
    get: get,
    key: key,
    isAvailable: isAvailable,
    remove: remove,
    set: set
  };
}();