

var _mapparams = {
  isDuplicate: function(key) {
    var params = {
      markers: true
    };
    if (params[key] && params[key] === true) {
      return true;
    } else {
      return false;
    }
  }

};

module.exports = _mapparams;
