var models = require('../models/index');
var account = require('../services/accountService');
var assert = require('chai').assert;
var account = require('../services/accountService');
var employee = require('../services/employee-create')
var expect = require('chai').expect;
var sinon = require('sinon');


suite('account', function () {
  suite('shuffle()', function () {
    test('should shuffle string', function (done) {
      var testAccount = new account();
      var testString = "abcdefgh";  
      var finalString = testAccount.shuffle(testString);    
      assert(finalString!=testString,'fail suffling');
        done();
    });
  });
});
