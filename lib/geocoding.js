/*!
 * Geocoding
 * Copyright(c) 2013 Shunsuke <qfoori@gmail.com>
 * MIT Licensed
 */

var Gmap       = require('./_googlemaps'),
    __extends  = require('./_extends'),
    objectutil = require('./objectutil');
    
var Geocoding = (function (_super) {
  __extends(Geocoding, _super);

  function Geocoding() {
    _super.call(this);
    this._service = 'geocode/';
  }

  Geocoding.prototype._cvtComponents = function(components) {
    if (!components) {
      return;
    }
    if (objectutil.isObject(components) === false) {
      return;
    }
    var components = components;
    var filter = '';
    for (var key in components) {
      if (filter.length > 0) {
        filter += '|';
      }
      filter += key + ':' + components[key];
    }
    if (filter.length > 0) {
      return filter;
    } else {
      return;
    }
  };

  Geocoding.prototype._geocoding = function(address, latlng, options, cb, sensor, isHttps) {
    var sensor = sensor || 'false';
    var params = {};
    if (address) {
      params.address = address;
    }
    if (latlng) {
      params.latlng  = latlng;
    }
    this._setOptions(options, params);
    if (params.bounds && objectutil.isObject(params.bounds) === true) {
      var bounds = params.bounds;
      if (bounds.sw && bounds.sw.lat && bounds.sw.lng
          && bounds.ne && bounds.ne.lat && bounds.ne.lng) {
        params.bounds = '';
        params.bounds += this._cvtLatLng(bounds.sw.lat, bounds.sw.lng);
        params.bounds += '|'
        params.bounds += this._cvtLatLng(bounds.ne.lat, bounds.ne.lng);
      }
    }
    if (params.components && objectutil.isObject(params.components) === true) {
      var components = this._cvtComponents(params.components);
      if (components) {
        params.components = components;
      }
    }
    params.sensor = sensor;

    this._request(params, isHttps, cb);
  };

  Geocoding.prototype.geocoding = function(address, options, cb, sensor, isHttps) {
    var isComponents = false;
    if (options && options.components) {
      isComponents = true;
    }
    if (!address && isComponents === false) {
      var err = new Error('address is not set');
      if (cb) {
        cb(err);
      }
      return;
    }
    return this._geocoding(address, null, options, cb, sensor, isHttps);
  };

  Geocoding.prototype.reverseGeocoding = function(lat, lng, options, cb, sensor, isHttps) {
    if (!lat || !lng) {
      var err = new Error('lat lng is not set');
      if (cb) {
        cb(err);
      }
      return;
    }
    var latlng = this._cvtLatLng(lat, lng);
    return this._geocoding(null, latlng, options, cb, sensor, isHttps);
  };

  return Geocoding;
})(Gmap);

module.exports = Geocoding;

