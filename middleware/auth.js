'use strict';
var db = require('../services/postgres'),
  E = require('express-http-errors'),
  logger = require('bragi'),
  P = require('bluebird'),
  lodash = require('lodash'),
  squel  = require('squel'),
  auth;

module.exports = auth = function (req, res, next) {
  if (!req.headers.authorization) {
    logger.log('auth', 'Missing authentication header');
    return next(new E.NotAuthorizedError('You must provide an api key'));
  }
  var key = req.headers.authorization;
  console.log(key);
  P.resolve(auth._buildQuery(key))
    .then(db.query)
    .then(auth._getFirstRow)
    .then(lodash.partial(auth._addCompanyToQuery, req.query))
    .then(next)
    .catch(function (err) {
      logger.log('auth:warn', err);
      next(err);
    });
};

auth._buildQuery = function (key) {
  return squel.select()
    .field('"CompanyId"')
    .from('"Apikeys"')
    .where('"Key" = ?', key)
    .toString();
};
auth._getFirstRow = function (rows) {
  if (rows.length === 0) {
    throw new E.NotAuthorizedError('Your Apikey is invalid');
  }
  return rows[0];
};

auth._addCompanyToQuery = function (query, row) {
  if (!row.CompanyId) {
    throw new E.NotAuthorizedError('Your Apikey is invalid');
  }
  query.company = row.CompanyId;
  logger.log('auth', 'authenticatd as company:', row.CompanyId);

};
