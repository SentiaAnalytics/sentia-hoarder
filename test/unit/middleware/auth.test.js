'use strict';
var chai = require('chai'),
  should = chai.should(),
  db =  require('../../../services/postgres'),
  target = require('../../../middleware/auth.js'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('Auth', function () {
  describe('_buildQuery', function () {
    it('should return a query', function () {
      var result = target._buildQuery('key');
      result.should.equal('SELECT "CompanyId" FROM "Apikeys" WHERE ("Key" = \'key\')');
    });
  });

  describe('_getFirstRow', function () {
    it('should return the first element of an array', function () {
      var result = target._getFirstRow(['stuff']);
      result.should.equal('stuff');
    });
    it('should trow an erro if the array is empty', function () {
      try {
        target._getFirstRow([]);
        should(true).equal(false);
      } catch (e) {}
    });
  });

  describe('_addCompanyToQuery', function () {
    it('should add a valid id to the query', function () {
      var query = {},
        row = {CompanyId : 1};
      target._addCompanyToQuery(query, row);
      query.should.have.property('company', 1);
    });
    it('should throw an error when called with no id', function () {
      var query = {},
        row = {};
      try {
        target._addCompanyToQuery(query, row);
      } catch (e) {
        query.should.not.have.property('company');
      }
    });
  });
});
