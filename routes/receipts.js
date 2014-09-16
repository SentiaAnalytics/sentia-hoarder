'use strict';
var ReceiptsService = require('../services/ReceiptsService');


exports.csv = {
  method : 'POST',
  handler : function (req) {
    return ReceiptsService.csv(req);
  },
  middleware : []
};
