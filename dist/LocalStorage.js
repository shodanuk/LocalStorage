var LocalStorage = function() {
  var _available = false,
      _ls = null,
      _isUserData = false;

  function isAvailable() {
    return _available;
  }

  function clearAll() {
    if (_isUserData) {
      throw "IE userData does not support the clear method";
      return null;
    } else {
      _ls.clear();
    };
    fireEvent('clear');
  }

  function fireEvent(event, key, val) {
    var memo = {};
    if(typeof key != 'undefined' && typeof val != 'undefined') memo[key] = val;
    Event.fire(document, "LocalStorage:"+event, memo);
  }

  function key(idx) {
    if (_isUserData) {
      throw "IE userData does not support the key method";
      return null;
    } else {
      return _ls.key(idx);
    };
  }

  function get(key) {
    var item;

    if (_isUserData) {
      _ls.load("cache");
      item = _ls.getAttribute(key);
    } else {
      item = _ls.getItem(key);
    };

    if (item != null) {
      return item.isJSON() ? item.evalJSON() : item;
    } else {
      return null;
    };

    fireEvent('getItem');
  }

  function remove(key) {
    if (_isUserData) {
      _ls.removeAttribute(key);
      _ls.save("cache");
    } else {
      _ls.removeItem(key);
    };

    fireEvent('removeItem', key, val);
  }

  function set(key, val) {
    val = (typeof val == 'object') ? Object.toJSON(val) : val;

    if (_isUserData) {
      _ls.setAttribute(key, val);
      _ls.save('cache');
    } else {
      _ls.setItem(key, val);
    };

    fireEvent('setItem', key, val);
  }

  function setup() {
    if ((typeof Modernizr != 'undefined' && Modernizr.localstorage) ||
        ('localStorage' in window && typeof window['localStorage'] !== null)) {
      _available = true;
      _ls = window.localStorage;
      fireEvent('ready');
    } else if (Prototype.Browser.IE) {
      _available = true;
      _isUserData = true;
      _ls = window.cachetag;
      fireEvent('ready');
    };
  }

  // off we go!
  Element.observe(document, "dom:loaded", setup);

  return {
    clearAll: clearAll,
    get: get,
    key: key,
    isAvailable: isAvailable,
    remove: remove,
    set: set
  };
}();