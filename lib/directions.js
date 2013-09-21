/*!
 * Directions
 * Copyright(c) 2013 Shunsuke <qfoori@gmail.com>
 * MIT Licensed
 */

var Gmap       = require('./_googlemaps'),
    __extends  = require('./_extends'),
    objectutil = require('./objectutil');
    
var Directions = (function (_super) {
  __extends(Directions, _super);

  function Directions() {
    _super.call(this);
    this._service = 'directions/';
  }

  Directions.prototype._cvtWaypoints = function(waypoints) {
    if (!waypoints) {
      return;
    }
    var waypoint  = '';
    for (var i = 0; i < waypoints.length; i++) {
      if (waypoint.length > 0) {
        waypoint += '|';
      }
      waypoint += waypoints[i];
    }
    if (waypoint.length > 0) {
      return waypoint;
    } else {
      return;
    }
  };

  Directions.prototype.directions = function(origin, destination, options, cb, sensor, isHttps, isRequest) {
    if (!origin || !destination) {
      var err = new Error('address is not set');
      if (cb) {
        cb(err);
      }
      return;
    }

    var uri = '';
    var sensor = sensor || 'false';
    var params = {};
    params.origin      = this._cvtObject(origin);
    params.destination = this._cvtObject(destination);
    
    this._setOptions(options, params);
    //if (params.waypoints && objectutil.isArray(params.waypoints) === true) {
    //  params.waypoints = this._cvtWaypoints(options.waypoints);
   // }
    params.sensor = sensor;

    this._request(params, cb, isHttps, isRequest);
  };

  return Directions;
})(Gmap);

module.exports = Directions;

