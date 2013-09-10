/*!
 * objectutil
 * Copyright(c) 2013 Shunsuke <qfoori@gmail.com>
 * MIT Licensed
 */


var objectutil = {
  isObject: function(obj) {
    if (!obj) {
      return false;
    }
    if (typeof(obj) === 'object') {
      return true;
    } else {
      return false;
    }
  },
  isArray: function(obj) {
    if (!obj) {
      return false;
    }
    if (obj instanceof Array) {
      return true;
    } else {
      return false;
    }
  },
  isFunction: function(obj) {
    if (!obj) {
      return false;
    }
    if (typeof obj === 'function') {
      return true;
    } else {
      return false;
    }
  },
  isString: function(obj) {
    if (!obj) {
      return false;
    }
    if (typeof obj === 'string') {
      return true;
    } else {
      return false;
    }
  },
  toArray: function(obj) {
    if (!obj) {
      return null;
    }
    if (objectutil.isArray(obj)) {
      return obj;
    } else {
      return [obj];
    }
  }
};

module.exports = objectutil;

