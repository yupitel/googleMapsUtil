googleMapsUtil
====

wrapper to use Google Maps API from node.js

## About
wrap Google Maps API

### Support API:
#### Directions API, Distance Matrix API, Elevation API, Geocoding API

## [Directions API](https://developers.google.com/maps/documentation/directions/ "directions")
- call Directions api
- directions(origin, destination, options, cb, sensor, isHttps, isRequest);
- parameter
    - origin: origin parameter (required)
        - input data type
            - address text or lat/lng text like latitude,longitude
            - or
            - lat/lng object {lat: xxxxx, lng: xxxxx}
    - destination: destination parameter (required)
        - input data type
            - address text or lat/lng text like latitude,longitude
            - or
            - lat/lng object {lat: xxxxx, lng: xxxxx}
    - options: optional parameter.
        - set key value object
        - waypoints
            - This optional key value data can be array object.
            - If this parameter is array, data in the array is connected with '|' internally.
    - cb: call back function
    - sensor: sensor parameter (default false)
    - isHttps: https setting (default false)
    - isRequest: if this value is false, return generated url(not do http request)(default null)

## [Distance Matrix API](https://developers.google.com/maps/documentation/distancematrix/ "distance matrix")
- call Distance Matrix api
- distancematrix(origins, destinations, options, cb, sensor, isHttps, isRequest);
- parameter
    - origins: origin parameter (required)
        - origin or array of origin
        - This field can use both array and not array object
        - input data type
            - address text or lat/lng text like latitude,longitude
            - or
            - lat/lng object {lat: xxxxx, lng: xxxxx}
    - destination: destination parameter (required)
        - destination or array of destination
        - This field can use both array and not array object
        - input data type
            - address text or lat/lng text like latitude,longitude
            - or
            - lat/lng object {lat: xxxxx, lng: xxxxx}
    - options: optional parameter.
        - set key value object
    - cb: call back function
    - sensor: sensor parameter (default false)
    - isHttps: https setting (default false)
    - isRequest: if this value is false, return generated url(not do http request)(default null)

## [Elevation API](https://developers.google.com/maps/documentation/elevation/ "elevation")
### Positional Requests
- locations(locations, options, cb, sensor, isHttps, isRequest)
- parameter
    - locations: location parameter (required)
        - location or array of location
        - This field can use both array and not array object
        - input data type
            - lat/lng text like latitude,longitude
            - or
            - lat/lng object {lat: xxxxx, lng: xxxxx}
    - options: optional parameter.
        - set key value object
    - cb: call back function
    - sensor: sensor parameter (default false)
    - isHttps: https setting (default false)
    - isRequest: if this value is false, return generated url(not do http request)(default null)

### Sampled Path Requests
- path(path, samples, options, cb, sensor, isHttps, isRequest) 
- parameter
    - path: path parameter (required)
        - path or array of path
        - This field can use both array and not array object
        - input data type
            - lat/lng text like latitude,longitude
            - or
            - lat/lng object {lat: xxxxx, lng: xxxxx}
    - samples: samples parameter (required)
    - options: optional parameter.
        - set key value object
    - cb: call back function
    - sensor: sensor parameter (default false)
    - isHttps: https setting (default false)
    - isRequest: if this value is false, return generated url(not do http request)(default null)

## [Geocoding API](https://developers.google.com/maps/documentation/geocoding/ "geocoding")
- geocoding(address, options, cb, sensor, isHttps, isRequest)
- parameter
    - address: address parameter (required)
        - address text
    - options: optional parameter.
        - set key value object
        - extra option
           - components
              - set key value object to use component filter
    - cb: call back function
    - sensor: sensor parameter (default false)
    - isHttps: https setting (default false)
    - isRequest: if this value is false, return generated url(not do http request)(default null)

- reverseGeocoding(lat, lng, options, cb, sensor, isHttps, isRequest)
- parameter
    - lat: latitude (required)
    - lng: longitude (required)
    - options: optional parameter.
        - set key value object
        - extra option
           - components
              - set key value object to use component filter
    - cb: call back function
    - sensor: sensor parameter (default false)
    - isHttps: https setting (default false)
    - isRequest: if this value is false, return generated url(not do http request)(default null)


## [Timezone API](https://developers.google.com/maps/documentation/timezone/ "timezone")
- timezone(lat, lng, timestamp, options, cb, sensor, isRequest)
- parameter
    - lat: latitude (required)
    - lng: longitude (required)
    - timestamp: timestamp (required)
    - options: optional parameter.
        - set key value object
    - cb: call back function
    - sensor: sensor parameter (default false)
    - isRequest: if this value is false, return generated url(not do http request)(default null)

## [Static Maps API](https://developers.google.com/maps/documentation/staticmaps/ "staticmaps")
- staticmap(parameters, cb, sensor, isHttps, isRequest)
- parameter
    - parameters: key value parameter
    - cb: call back function
    - sensor: sensor parameter (default false)
    - isHttps: https setting (default false)
    - isRequest: if this value is false, return generated url(not do http request)(default null)
## Optional API
- setProxy
    - set proxy for http request
       - setProxy(proxy, port);
       - proxy: ptocy
       - port: port

- setParameter
    - set parameter to use each api
    - setParameter(key, value);
    - This parameter is stored internally and used at every request

- clearParameter
    - clear stored parameter

- setOutput
    - set output format
    - xml or json

## Optional API
- setProxy
    - set proxy for http request
       - setProxy(proxy, port);
       - proxy: ptocy
       - port: port

- setParameter
    - set parameter to use each api
    - setParameter(key, value);
    - This parameter is stored internally and used at every request

- clearParameter
    - clear stored parameter

- setOutput
    - set output format
    - xml or json

## Usage 1
    // call api
    var gmaputil = require('googlemapsutil');
    
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
    gmaputil.reverseGeocoding(40.714224,-73.961452, null, cb);
    
    
    // change output format
    // xml
    gmaputil.setOutput('xml');
    // json
    gmaputil.setOutput('json');


## Usage 2
    // call api from class object
    var cb = function(err, result) {
      if (err) {
        console.log(err);
      }
      console.log(result);
    };
    
    
    var Directions = require('googlemapsutil').Directions;
    directions = new Directions();
     // directions api sample
    directions.directions('Toronto', 'Montreal', null, cb);
    directions.directions('Toronto', 'Montreal', {avoid: 'highways', mode: 'bicycling'}, cb);
    
    // distance matrix api sample
    var Distancematrix = require('googlemapsutil').Distancematrix;
    distancematrix = new Distancematrix();
    distancematrix.distancematrix(['Vancouver+BC', 'Seattle'], ['San+Francisco', 'Victoria+BC'], {mode: 'bicycling', language: 'fr-FR'}, cb);
    
    // elevation api sample    
    var Elevation  = require('googlemapsutil').Elevation;
    elevation = new Elevation();
    // locations
    elevation.locations([{lat:39.7391536, lng:-104.9847034},{lat:36.455556,lng:-116.866667}], null, cb);
    // this is same with above
    elevation.locations('39.7391536,-104.9847034|36.455556,-116.866667', null, cb);
    
    // path
    elevation.path([{lat: 36.578581, lng:-118.291994},{lat:36.23998,lng:-116.83171}],3, null, cb);
    
    // geocoding api sample
    var Geocoding  = require('googlemapsutil').Geocoding;
    geocoding = new Geocoding();
    
    // geocoding
    geocoding.geocoding('1600+Amphitheatre+Parkway,+Mountain+View,+CA', null, cb);
    
    // geocoding with components filter
    geocoding.geocoding('Torun', {components: {administrative_area:'TX', country:'US'}}, null, cb);
    // geocoding components filter only
    geocoding.geocoding(null, {components: {route:'Annegatan', administrative_area:'Helsinki',country:'Finland'}}, null, cb);
    
    // reverse geocoding
    geocoding.reverseGeocoding(40.714224,-73.961452, null, cb);


## License 

(The MIT License)

Copyright (c) 2013 Shunsuke &lt;qfoori@gmail.com&gt;  

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
