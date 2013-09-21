// call api from class object

var cb = function(err, result) {
  if (err) {
    console.log(err);
  }
  console.log(result);
};


var Directions = require('../googlemapsutil').Directions;
directions = new Directions();
 // directions api sample
directions.directions('Toronto', 'Montreal', null, cb);
directions.directions('Toronto', 'Montreal', {avoid: 'highways', mode: 'bicycling'}, cb);

// distance matrix api sample
var Distancematrix = require('../googlemapsutil').Distancematrix;
distancematrix = new Distancematrix();
distancematrix.distancematrix(['Vancouver+BC', 'Seattle'], ['San+Francisco', 'Victoria+BC'], {mode: 'bicycling', language: 'fr-FR'}, cb);

// elevation api sample    
var Elevation  = require('../googlemapsutil').Elevation;
elevation = new Elevation();
// locations
elevation.locations([{lat:39.7391536, lng:-104.9847034},{lat:36.455556,lng:-116.866667}], null, cb);
// this is same with above
elevation.locations('39.7391536,-104.9847034|36.455556,-116.866667', null, cb);

// path
elevation.path([{lat: 36.578581, lng:-118.291994},{lat:36.23998,lng:-116.83171}],3, null, cb);

// geocoding api sample
var Geocoding  = require('../googlemapsutil').Geocoding;
geocoding = new Geocoding();

// geocoding
geocoding.geocoding('1600+Amphitheatre+Parkway,+Mountain+View,+CA', null, cb);

// geocoding with components filter
geocoding.geocoding('Torun', {components: {administrative_area:'TX', country:'US'}}, null, cb);
// geocoding components filter only
geocoding.geocoding(null, {components: {route:'Annegatan', administrative_area:'Helsinki',country:'Finland'}}, null, cb);

// reverse geocoding
geocoding.reverseGeocoding(40.714224,-73.961452, null, cb);
