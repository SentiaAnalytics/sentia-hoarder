'use strict';

exports.create = {
  handler : function (req, res) {
    return res.send(req.body);
  }
};
