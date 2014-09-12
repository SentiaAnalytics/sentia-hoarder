'use strict';
var ReceiptsService = require('../services/ReceiptsService'),
  middleware = require('../middleware');


exports.csv = {
  method : 'POST',
  handler : function (req) {
    return ReceiptsService.csv(req);
  },
  middleware : []
};
