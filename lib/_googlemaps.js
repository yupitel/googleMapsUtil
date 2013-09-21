/*!
 * GoogleMapApi Utility
 * Copyright(c) 2013 Shunsuke <qfoori@gmail.com>
 * MIT Licensed
 */
var config      = require('../config.json'),
    httputil    = require('./httputil'),
    querystring = require('querystring'),
    objectutil  = require('./objectutil');

var Gmap = (function () {
  function Gmap() {
    this._proxy  = undefined;
    this._port   = undefined;
    this._host   = 'maps.googleapis.com';
    this._path   = '/maps/api/';
    this._output = 'json';
    this._config = undefined;
    this._params = {};
    if (config && objectutil.isObject(config) === true) {
      this._config = config;
      for (var key in config) {
        this._params[key] = config[key];
      }
    }
  }
  

  Gmap.prototype._cvtLatLng = function(lat, lng) {
    if (!lat || !lng) {
      return;
    }
    var latlng = '';
    latlng += String(lat);
    latlng += ',';
    latlng += String(lng);
    return latlng;
  };

  Gmap.prototype._cvtObject = function(obj) {
   var self = this;
    var fnObj = function(obj) {
      if (objectutil.isObject(obj) === true) {
        if (obj.lat && obj.lng) {
          return self._cvtLatLng(obj.lat, obj.lng);
        } else if (obj.sw && obj.ne) {
          var val = '';
          val += fnObj(obj.sw);
          val += '|';
          val += fnObj(obj.ne);
          return val;
        } else {
          return querystring.stringify(obj, '|', ':');
        }
      } else {
        return obj;
      }
    };

    var param = '';
    if (objectutil.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        if (i > 0) {
          param += '|';
        }
        param += fnObj(obj[i]);
      }
    } else {
      param += fnObj(obj);
    }
    return param;
  };

  Gmap.prototype._setOptions = function(src, dst) {
    if (!src || !dst) {
      return;
    }
    if (objectutil.isObject(src) === true) {
      for (var key in src) {
        if (objectutil.isObject(src[key]) === true) {
          dst[key] = this._cvtObject(src[key]);
        } else {
          dst[key] = src[key];
        }
      }
    }
    return;
  };

  Gmap.prototype.setProxy = function(proxy, port) {
    this._proxy = proxy;
    this._port  = port;
  };

  Gmap.prototype.getParameter = function(key) {
    if (!key) {
      return;
    }
    return this._params[key];
  };

  Gmap.prototype.setParameter = function(key, value) {
    if (!key) {
      return;
    }
    this._params[key] = value;
  };

  Gmap.prototype.clearParameter = function() {
    this._params = {};
  };

  Gmap.prototype._request = function(params, cb, isHttps, isRequest) {
    var paramurl;
    var _paramurl;

    var hostname;
    var port;
    var path;
    var headers;
    if ((this._proxy && this._port) || isRequest === false) {
      hostname = this._proxy;
      port     = this._port;
      if (isHttps === true) {
        path = 'https://' + this._host + this._path + this._service + this._output;
      } else {
        path = 'http://' + this._host + this._path + this._service  + this._output;
      }
      headers = {Host: this._host};
    } else {
      hostname = this._host;
      port     = 80;
      path     = this._path + this._service + this._output;
    }

    paramurl  = querystring.stringify(params);
    _paramurl = querystring.stringify(this._params);
    if (paramurl) {
      if (_paramurl) {
        paramurl += '&' + _paramurl;
      }
      path += '?' + paramurl;
    }

    if (isRequest === false) {
      if (cb) {cb(null, path);}
      return;
    }

    var httpoptions = {
      hostname: hostname,
      port: port,
      path: null,
      method: 'GET'
    };
    if (headers) {
      httpoptions.headers = headers;
    }
    httpoptions.path = path;

    if (isHttps === true) {
      httputil.securerequest(httpoptions, null, cb);
    } else {
      httputil.request(httpoptions, null, cb);
    }
  };

  Gmap.prototype.getOutput = function() {
    return this._output;
  };

  Gmap.prototype.setOutput = function(type) {
    if (type && type.length > 0) {
      this._output = type;
    }
  };

  return Gmap;
})();

module.exports = Gmap;

