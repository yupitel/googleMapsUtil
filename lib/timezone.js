/*!
 * Timezone
 * Copyright(c) 2013 Shunsuke <qfoori@gmail.com>
 * MIT Licensed
 */

var Gmap       = require('./_googlemaps'),
    __extends  = require('./_extends');
    
var Timezone = (function (_super) {
  __extends(Timezone, _super);

  function Timezone() {
    _super.call(this);
    this._service = 'timezone/';
  }

  Timezone.prototype.timezone = function(lat, lng, timestamp, options, cb, sensor, isRequest) {
    if (!lat || !lng || !timestamp) {
      var err = new Error('parameter is not set');
      if (cb) {
        cb(err);
      }
      return;
    }
    var isHttps = true;
    var sensor = sensor || 'false';
    var params = {};
    var latlng = this._cvtLatLng(lat, lng);
    params.location  = latlng;
    params.timestamp = timestamp;
    this._setOptions(options, params);
    params.sensor = sensor;

    this._request(params, cb, isHttps, isRequest);
  };

  return Timezone;
})(Gmap);

module.exports = Timezone;

