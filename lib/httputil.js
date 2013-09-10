var http        = require('http'),
    https       = require('https'),
    querystring = require('querystring'),
    objutil     = require('./objectutil');

module.exports = httputil;
  
function httputil () {
}

httputil._toJson = function(objects) {
  var json;
  if (objects) {
    json = querystring.stringify(objects);
  }
  return json;
};

httputil._setHeader = function(json, headers) {
  var headers = headers || {};
  if (json && json.length > 0) {
    headers['Content-Type']   = 'application/json';
    headers['Content-Length'] = Buffer.byteLength(json);
  } else {
    headers['Content-Type']   = 'application/html';
  }
  return headers;
};

httputil._request = function _request (conn, options, objects, cb) {
  var json = this._toJson(objects);
  options.headers = this._setHeader(json, options.headers);
  var req = conn.request(options, function(res){
    res.setEncoding('utf-8');
    var response = '';
    res.on('data', function(data) {
      response += data;
    });
    res.on('end', function() {
      if (cb) {cb(null, response);}
      return;
    });  
  });  
  
  req.on('error', function(err) {
    if (cb) {cb(err)};
  });

  if (json) {
    req.write(json);
  }
  req.end();
};

httputil.createparams = function(params) {
  if (!params) {
    return;
  }
  if (objutil.isArray(params) === false) {
    return params;
  }
  var uri = '';
  for (var i = 0; i < params.length; i++) {
    if (i > 0) {
      uri += '&';
    }
    var param = params[i];
    uri += param;
  }
  return uri;
};

httputil.request = function request (options, objects, cb) {
  this._request(http, options, objects, cb);
};

httputil.securerequest = function securerequest (options, objects, cb) {
  this._request(https, options, objects, cb);
};

