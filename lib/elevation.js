/*!
 * Elevation
 * Copyright(c) 2013 Shunsuke <qfoori@gmail.com>
 * MIT Licensed
 */

var Gmap       = require('./_googlemaps'),
    __extends  = require('./_extends'),
    objectutil = require('./objectutil');
    
var Elevation = (function (_super) {
  __extends(Elevation, _super);

  function Elevation() {
    _super.call(this);
    this._service = 'elevation/';
  }

  Elevation.prototype._elevation = function(locations, path, samples, options, cb, sensor, isHttps, isReqest) {
    var sensor = sensor || 'false';
    var isRequest = isReqest || true;
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

    this._request(params, cb, isHttps, isReqest);
  };

  

  Elevation.prototype.locations = function(locations, options, cb, sensor, isHttps, isReqest) {
    if (!locations) {
      var err = new Error('parameter is not set');
      if (cb) {
        cb(err);
      }
      return;
    }

    this._elevation(locations, null, null, options, cb, sensor, isHttps, isReqest);
  };
  
  Elevation.prototype.path = function(path, samples, options, cb, sensor, isHttps, isReqest) {
    if (!path || !samples) {
      var err = new Error('parameter is not set');
      if (cb) {
        cb(err);
      }
      return;
    }

    this._elevation(null, path, samples, options, cb, sensor, isHttps, isReqest);
  };

  return Elevation;
})(Gmap);

module.exports = Elevation;

