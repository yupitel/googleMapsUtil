/*!
 * gmaputil
 * Copyright(c) 2013 Shunsuke <qfoori@gmail.com>
 * MIT Licensed
 */

var objectutil     = require('./lib/objectutil.js')
  , Directions     = require('./lib/directions.js')
  , Distancematrix = require('./lib/distancematrix.js')
  , Elevation      = require('./lib/elevation.js')
  , Geocoding      = require('./lib/geocoding.js')
  , Timezone       = require('./lib/timezone.js')
  , StaticMaps     = require('./lib/staticmaps.js');


var directions     = new Directions()
  , distancematrix = new Distancematrix()
  , elevation      = new Elevation()
  , geocoding      = new Geocoding()
  , timezone       = new Timezone()
  , staticmaps     = new StaticMaps();


var services = [];
services.push(directions);
services.push(distancematrix);
services.push(elevation);
services.push(geocoding);
services.push(timezone);
services.push(staticmaps);


var gmaputil = {  
  setProxy: function(proxy, port) {
    for (var i = 0; i < services.length; i++) {
      services[i].setProxy(proxy, port);
    }
  },
  setParameter: function(key, value) {
    for (var i = 0; i < services.length; i++) {
      services[i].setParameter(key, value);
    }
  },
  clearParameter: function() {
    for (var i = 0; i < services.length; i++) {
      services[i].clearParameter();
    }
  },
  setOutput: function(type) {
    for (var i = 0; i < services.length; i++) {
      services[i].setOutput(type);
    }
  },
  directions: function(origin, destination, options, cb, sensor, isHttps, isRequest) {
    directions.directions(origin, destination, options, cb, sensor, isHttps, isRequest);
  },
  distancematrix: function(origins, destinations, options, cb, sensor, isHttps, isRequest) {
    distancematrix.distancematrix(origins, destinations, options, cb, sensor, isHttps, isRequest);
  },
  locations: function(locations, options, cb, sensor, isHttps, isRequest) {
    elevation.locations(locations, options, cb, sensor, isHttps, isRequest);
  },
  path: function(path, sample, options, cb, sensor, isHttps, isRequest) {
    elevation.path(path, sample, options, cb, sensor, isHttps, isRequest);
  },
  geocoding: function(address, options, cb, sensor, isHttps, isRequest) {
    geocoding.geocoding(address, options, cb, sensor, isHttps, isRequest);
  },
  reverseGeocoding: function(lat, lng, options, cb, sensor, isHttps, isRequest) {
    geocoding.reverseGeocoding(lat, lng, options, cb, sensor, isHttps, isRequest);
  },
  timezone: function(lat, lng, timestamp, options, cb, sensor, isHttps, isRequest) {
    timezone.timezone(lat, lng, timestamp, options, cb, sensor, isHttps, isRequest);
  },
  staticmapas: function(parameters, cb, sensor, isHttps, isRequest) {
    staticmaps.staticmaps(parameters, cb, sensor, isHttps, isRequest);
  }

};

module.exports = gmaputil;

module.exports.Directions     = Directions;
module.exports.Distancematrix = Distancematrix;
module.exports.Elevation      = Elevation;
module.exports.Geocoding      = Geocoding;
module.exports.Timezone       = Timezone;
module.exports.StaticMaps     = StaticMaps;

