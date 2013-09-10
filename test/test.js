var gmaputil = require('googlemapsutil');

var cb = function(err, result) {
  console.log(err);
  console.log(result);
};


gmaputil.geocoding('1600+Amphitheatre+Parkway,+Mountain+View,+CA');
gmaputil.setOutput('xml');
gmaputil.reverseGeocoding(40.714224,-73.961452);


gmaputil.setOutput('json');
gmaputil.geocoding('Torun', {components: {administrative_area:'TX', country:'US'}});

gmaputil.geocoding(null, {components: {route:'Annegatan', administrative_area:'Helsinki',country:'Finland'}}, cb);


gmaputil.distancematrix(['Bobcaygeon+ON', {lat: 41.43206, lng: -81.38992}],
                 ['Darling+Harbour+NSW+Australia', '24+Sussex+Drive+Ottawa+ON', 'Capitola+CA']);

gmaputil.locations({lat: 39.7391536, lng:-104.9847034});

gmaputil.path([{lat: 36.578581, lng:-118.291994}
  , {lat: 36.23998, lng: -116.83171}], 3);

gmaputil.reverseGeocoding(34.85664960, 138.29256330, false);


