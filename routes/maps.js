'use strict';
var MapsService = require('../services/MapsService'),
  middleware = require('../middleware');


exports.csv = {
  method : 'POST',
  handler : function (req) {
    return MapsService.csv(req);
  },
  middleware : []
};
