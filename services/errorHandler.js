'use strict';
module.exports = function (err, req, res, next) {
  console.log(err);
  if (!err) {
    return next();
  }
    // console.error(err.stack);
  if (err.statusCode && err.statusCode < 600) {
    console.log(err.statusCode);
    return res.status(err.statusCode)
      .send(err.message);
  }
  console.log(err);
  return res.status(500)
      .send('Internal Server Error');
};
