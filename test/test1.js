// call api
var gmaputil = require('../googlemapsutil');

// call api from class object
var cb = function(err, result) {
  if (err) {
    console.log(err);
  }
  console.log(result);
};

// directions api sample
gmaputil.directions('Toronto', 'Montreal', null, cb);
gmaputil.directions('Toronto', 'Montreal', {avoid: 'highways', mode: 'bicycling'}, cb);

// distance matrix api sample
gmaputil.distancematrix(['Vancouver+BC', 'Seattle'], ['San+Francisco', 'Victoria+BC'], {mode: 'bicycling', language: 'fr-FR'}, cb);

// elevation api sample
// locations
gmaputil.locations([{lat:39.7391536, lng:-104.9847034},{lat:36.455556,lng:-116.866667}], null, cb);
// this is same with above
gmaputil.locations('39.7391536,-104.9847034|36.455556,-116.866667', null, cb);

// path
gmaputil.path([{lat: 36.578581, lng:-118.291994},{lat:36.23998,lng:-116.83171}],3, null, cb);

// geocoding api sample
// geocoding
gmaputil.geocoding('1600+Amphitheatre+Parkway,+Mountain+View,+CA', null, cb);

// geocoding with components filter
gmaputil.geocoding('Torun', {components: {administrative_area:'TX', country:'US'}}, cb);
// geocoding components filter only
gmaputil.geocoding(null, {components: {route:'Annegatan', administrative_area:'Helsinki',country:'Finland'}}, cb);

// reverse geocoding
gmaputil.reverseGeocoding(40.714224, -73.961452, null, cb);

// time zone
gmaputil.timezone(39.6034810, -119.6822510, 1331161200, null, cb);

// change output format
// xml
gmaputil.setOutput('xml');
// json
gmaputil.setOutput('json');

