var gmaputil = require('../googlemapsutil.js');

var cb = function(err, result) {
  console.log(err);
  console.log(result);
};


//var dir = new directions();
//dir.directions('Toronto', 'Montreal');

//var dm = new distancematrix();
//dm.distancematrix(['Bobcaygeon+ON', {lat: 41.43206, lng: -81.38992}],
//                 ['Darling+Harbour+NSW+Australia', '24+Sussex+Drive+Ottawa+ON', 'Capitola+CA']);

//http://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&mode=bicycling&language=fr-FR&sensor=false

//gmaputil.distancematrix(['Vancouver+BC', 'Seattle'], ['San+Francisco', 'Victoria+BC'], {mode: 'bicycling', language: 'fr-FR'});

//var elevation = new elevation();
//elevation.locations({lat: 39.7391536, lng:-104.9847034});

//elevation.path([{lat: 36.578581, lng:-118.291994}
//  , {lat: 36.23998, lng: -116.83171}], 3);

//http://maps.googleapis.com/maps/api/elevation/json?locations=39.7391536,-104.9847034|36.455556,-116.866667&sensor=true_or_false
//gmaputil.locations([{lat:39.7391536, lng:-104.9847034},{lat:36.455556,lng:-116.866667}]);

//gmaputil.locations('39.7391536,-104.9847034|36.455556,-116.866667');
//
//gmaputil.path([{lat: 36.578581, lng:-118.291994},{lat:36.23998,lng:-116.83171}],3);

//http://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=true_or_false
//gmaputil.geocoding('1600+Amphitheatre+Parkway,+Mountain+View,+CA');
//gmaputil.setOutput('xml');
//gmaputil.reverseGeocoding(40.714224,-73.961452);

//gmaputil.directions('Toronto', 'Montreal');
//gmaputil.directions('Toronto', 'Montreal', {avoid: 'highways', mode: 'bicycling'});

//gmaputil.setOutput('json');
//http://maps.google.com/maps/api/geocode/json?address=Torun&components=administrative_area:TX|country:US&sensor=false
//
//gmaputil.geocoding('Torun', {components: {administrative_area:'TX', country:'US'}});

//http://maps.google.com/maps/api/geocode/json?components=route:Annegatan|administrative_area:Helsinki|country:Finland&sensor=false
gmaputil.geocoding(null, {components: {route:'Annegatan', administrative_area:'Helsinki',country:'Finland'}}, cb);

/*
gmaputil.distancematrix(['Bobcaygeon+ON', {lat: 41.43206, lng: -81.38992}],
                 ['Darling+Harbour+NSW+Australia', '24+Sussex+Drive+Ottawa+ON', 'Capitola+CA']);

gmaputil.locations({lat: 39.7391536, lng:-104.9847034});

gmaputil.path([{lat: 36.578581, lng:-118.291994}
  , {lat: 36.23998, lng: -116.83171}], 3);

gmaputil.reverseGeocoding(34.85664960, 138.29256330, false);
*/

