'use strict';
var ReceiptsService = require('../services/ReceiptsService');


exports.csv = {
  method : 'POST',
  handler : function (req, res, next) {
    return ReceiptsService.csv(req)
      .catch(next)
      .done(function () {
        return res.status(200).send('OK');
    });
  },
  middleware : []
};
