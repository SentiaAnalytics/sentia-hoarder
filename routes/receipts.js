'use strict';
var ReceiptsService = require('../services/ReceiptsService');


exports.csv = {
  method : 'POST',
  handler : function (req, res, next) {
    return ReceiptsService.csv(req)
      .then(function () {
        return res.status(200).send('OK');
      })
      .catch(next);
  },
  middleware : []
};
