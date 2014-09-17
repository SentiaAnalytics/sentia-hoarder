'use strict';
var MapsService = require('../services/MapsService');


exports.csv = {
  method : 'POST',
  handler : function (req) {
    return MapsService.csv(req);
  },
  middleware : []
};
