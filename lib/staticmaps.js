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

  StaticMaps.prototype._staticmap = function(locations, path, samples, options, cb, sensor, isHttps, isRequest) {
    var sensor = sensor || 'false';
    var param;
    var params = {};
    try {
      if (locations) {
        params.locations = this._cvtAddress(locations);
      }
      if (path) {
        params.path      = this._cvtAddress(path);
        params.samples   = samples;
      }
    } catch (err) {
      if (cb) {
        cb(err);
      }
      return;
    }

    this._setOptions(options, params); 
    params.sensor = sensor;

    this._request(params, cb, isHttps, isRequest);
  };

  

  StaticMaps.prototype.locations = function(locations, options, cb, sensor, isHttps, isRequest) {
    if (!locations) {
      var err = new Error('parameter is not set');
      if (cb) {
        cb(err);
      }
      return;
    }

    this._staticmap(locations, null, null, options, cb, sensor, isHttps, isRequest);
  };
  
  StaticMaps.prototype.sitemap = function(params, cb, sensor, isHttps, isRequest) {
    if (!path || !samples) {
      var err = new Error('parameter is not set');
      if (cb) {
        cb(err);
      }
      return;
    }

    this._staticmap(null, path, samples, options, cb, sensor, isHttps, isRequest);
  };

  return StaticMaps;
})(Gmap);

module.exports = StaticMaps;

