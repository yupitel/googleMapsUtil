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


  Geocoding.prototype._geocoding = function(address, latlng, options, cb, sensor, isHttps, isRequest) {
    var sensor = sensor || 'false';
    var params = {};
    if (address) {
      params.address = address;
    }
    if (latlng) {
      params.latlng  = latlng;
    }
    this._setOptions(options, params);
    params.sensor = sensor;
    this._request(params, cb, isHttps, isRequest);
  };

  Geocoding.prototype.geocoding = function(address, options, cb, sensor, isHttps, isRequest) {
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
    return this._geocoding(address, null, options, cb, sensor, isHttps, isRequest);
  };

  Geocoding.prototype.reverseGeocoding = function(lat, lng, options, cb, sensor, isHttps, isRequest) {
    if (!lat || !lng) {
      var err = new Error('lat lng is not set');
      if (cb) {
        cb(err);
      }
      return;
    }
    var latlng = this._cvtLatLng(lat, lng);
    return this._geocoding(null, latlng, options, cb, sensor, isHttps, isRequest);
  };

  return Geocoding;
})(Gmap);

module.exports = Geocoding;

