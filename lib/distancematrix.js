/*!
 * DistanceMatrix
 * Copyright(c) 2013 Shunsuke <qfoori@gmail.com>
 * MIT Licensed
 */

var Gmap       = require('./_googlemaps'),
    __extends  = require('./_extends');
    
var DistanceMatrix = (function (_super) {
  __extends(DistanceMatrix, _super);

  function DistanceMatrix() {
    _super.call(this);
    this._service = 'distancematrix/';
  }

  DistanceMatrix.prototype.distancematrix = function(origins, destinations, options, cb, sensor, isHttps, isRequest) {
    if (!origins || !destinations) {
      var err = new Error('address is not set');
      if (cb) {
        cb(err);
      }
      return;
    }

    var sensor = sensor || 'false';
    var componenturi;
    var param;
    var params = {};
    try {
      params.origins      = this._cvtObject(origins);
      params.destinations = this._cvtObject(destinations);
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


  return DistanceMatrix;
})(Gmap);

module.exports = DistanceMatrix;

