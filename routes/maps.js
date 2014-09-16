'use strict';
var MapsService = require('../services/MapsService');


exports.csv = {
  method : 'POST',
  handler : function (req) {
    console.log(req.query);
    console.log(req.body);
    return MapsService.csv(req);
  },
  middleware : []
};
