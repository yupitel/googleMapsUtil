/*!
 * GoogleMapApi Utility
 * Copyright(c) 2013 Shunsuke <qfoori@gmail.com>
 * MIT Licensed
 */
var config      = require('../config.json')
  , httputil    = require('./httputil')
  , querystring = require('querystring')
  , objectutil  = require('./objectutil')
  , mapparams   = require('./_mapparams');

querystring.escape = function(str) {
  return str;
};

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
          var key;
          var val;
          if (obj.points) {
            key = 'points';
            obj.points = self._cvtObject(obj.points);
          } else if (obj.locations) {
            key = 'locations';
            obj.locations = self._cvtObject(obj.locations);
          }
          key += ':';
          val = querystring.stringify(obj, '|', ':');
          val = querystring.unescape(val);
          val = val.replace(key, '');
          return val;
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
          if (mapparams.isDuplicate(key) === true && objectutil.isArray(src[key]) === true) {
            var str = '';
            var strtmp;
            var obj = {};
            for (var i = 0; i < src[key].length; i++) {
              strtmp = '';
              obj[key] = src[key][i];
              if (i > 0) {
                strtmp += '&';
                strtmp += key;
                strtmp += '=';
              }
              strtmp += this._cvtObject(src[key][i]);
              str += strtmp;
            }
            dst[key] = str;
          } else {
            dst[key] = this._cvtObject(src[key]);
          }
        } else {
          dst[key] = src[key];
        }
        if (dst[key] && objectutil.isString(dst[key]) === true) {
          dst[key] = dst[key].replace('%2C', ',');
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
  
  Gmap.prototype.escape = function(str) {
    if (!str) {
      return str;
    }
    var rep;
    rep = str.replace(/\|/g, '%7C');
    return rep;
  };

  Gmap.prototype._request = function(params, cb, isHttps, isRequest, isOutput) {
    var paramurl;
    var _paramurl;

    var hostname;
    var port;
    var path;
    var headers;
    var output = this._output;
    if (isOutput === false) {
      output = '';
    }

    if ((this._proxy && this._port) || isRequest === false) {
      hostname = this._proxy;
      port     = this._port;
      if (isHttps === true) {
        path = 'https://' + this._host + this._path + this._service + output;
      } else {
        path = 'http://' + this._host + this._path + this._service  + output;
      }
      headers = {Host: this._host};
    } else {
      hostname = this._host;
      port     = 80;
      path     = this._path + this._service + output;
    }
    paramurl  = querystring.stringify(params);
    _paramurl = querystring.stringify(this._params);
    
    // escape string for google rule
    paramurl  = this.escape(paramurl);
    _paramurl = this.escape(_paramurl);
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

