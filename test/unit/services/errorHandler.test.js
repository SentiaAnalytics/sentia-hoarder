'use strict';
var chai = require('chai'),
  should = chai.should(),
  target = require('../../../services/errorHandler'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('errorHandler', function () {
  describe('when called with a http error', function() {
    var error, res, next;
    before(function () {
      res = {
        status : sinon.spy(function () {
          return res;
        }),
        send : sinon.spy()
      };
      next = sinon.spy();
      error = {
        code : 400,
        message : 'Invalid input'
      };
      target(error, null, res, next);
    });

    it('should not call next', function () {
      next.called.should.equal(false);
    });

    it('should call res.status once', function () {
      res.status.calledOnce.should.equal(true);
    });

    it('call res.status with 400', function () {
      res.status.args[0][0].should.equal(400);
    });

    it('should call res.send', function () {
      res.send.calledOnce.should.equal(true);
      res.send.args[0][0].should.equal('Invalid input');
    });
  });
  describe('when called with a random error', function() {
    var error, res, next;
    before(function () {
      res = {
        status : sinon.spy(function () {
          return res;
        }),
        send : sinon.spy()
      };
      next = sinon.spy();
      error = {
        fuck : 'things went wrong'
      };
      target(error, null, res, next);
    });

    it('should not call next', function () {
      next.called.should.equal(false);
    });

    it('should call res.status once', function () {
      res.status.calledOnce.should.equal(true);
    });

    it('call res.status with 400', function () {
      res.status.args[0][0].should.equal(500);
    });

    it('should call res.send', function () {
      res.send.calledOnce.should.equal(true);
      res.send.args[0][0].should.equal('Internal Server Error');
    });
  });
});
