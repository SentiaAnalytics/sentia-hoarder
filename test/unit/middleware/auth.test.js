'use strict';
var chai = require('chai'),
  target = require('../../../middleware/auth.js'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('Auth', function () {
  var next;
   before(function () {
     next = sinon.spy();
     target(null,null,next);
   });

   it('should call next once', function () {
     next.should.have.property('calledOnce', true);
   });
});
