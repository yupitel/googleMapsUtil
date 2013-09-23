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
    this._service = 'staticmap';
  }
  
  StaticMaps.prototype.staticmap = function(parameters, cb, sensor, isHttps, isRequest) {
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
    this._setOptions(parameters, params);

    params.sensor = sensor;
    this._request(params, cb, isHttps, isRequest, false);
  };

  return StaticMaps;
})(Gmap);

module.exports = StaticMaps;

