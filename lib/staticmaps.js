/*!
 * StaticMaps
 * Copyright(c) 2013 Shunsuke <qfoori@gmail.com>
 * MIT Licensed
 */

var Gmap       = require('./_googlemaps'),
    __extends  = require('./_extends');
    
var StaticMaps = (function (_super) {
  __extends(StaticMaps, _super);

  function StaticMaps() {
    _super.call(this);
    this._service = 'staticmap/';
  }

  
  StaticMaps.prototype.sitemap = function(parameters, cb, sensor, isHttps, isRequest) {
    if (!parameters) {
      var err = new Error('parameter is not set');
      if (cb) {
        cb(err);
      }
      return;
    }

    var sensor = sensor || 'false';
    var param;
    var params = {};
    this._setOptions(paramters, params);
    try {
      
      if (params.center) {
        params.center = this._cvtAddress(params.center);
      }
      if (params.path) {
        params.path      = this._cvtAddress(params.path);
      }
    } catch (err) {
      if (cb) {
        cb(err);
      }
      return;
    }

    params.sensor = sensor;
    this._request(params, cb, isHttps, isRequest);
  };

  return StaticMaps;
})(Gmap);

module.exports = StaticMaps;

