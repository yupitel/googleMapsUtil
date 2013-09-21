/*!
 * Elevation
 * Copyright(c) 2013 Shunsuke <qfoori@gmail.com>
 * MIT Licensed
 */

var Gmap       = require('./_googlemaps'),
    __extends  = require('./_extends');
    
var Elevation = (function (_super) {
  __extends(Elevation, _super);

  function Elevation() {
    _super.call(this);
    this._service = 'elevation/';
  }

  Elevation.prototype._elevation = function(locations, path, samples, options, cb, sensor, isHttps, isRequest) {
    var sensor = sensor || 'false';
    var param;
    var params = {};
    try {
      if (locations) {
        params.locations = this._cvtObject(locations);
      }
      if (path) {
        params.path      = this._cvtObject(path);
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

  

  Elevation.prototype.locations = function(locations, options, cb, sensor, isHttps, isRequest) {
    if (!locations) {
      var err = new Error('parameter is not set');
      if (cb) {
        cb(err);
      }
      return;
    }

    this._elevation(locations, null, null, options, cb, sensor, isHttps, isRequest);
  };
  
  Elevation.prototype.path = function(path, samples, options, cb, sensor, isHttps, isRequest) {
    if (!path || !samples) {
      var err = new Error('parameter is not set');
      if (cb) {
        cb(err);
      }
      return;
    }

    this._elevation(null, path, samples, options, cb, sensor, isHttps, isRequest);
  };

  return Elevation;
})(Gmap);

module.exports = Elevation;

