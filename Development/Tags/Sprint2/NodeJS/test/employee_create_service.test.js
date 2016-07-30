var models = require('../models/index');
var account = require('../services/accountService');
var assert = require('chai').assert;
var account = require('../services/accountService');
var employee = require('../services/employee-create')
var expect = require('chai').expect;
var sinon = require('sinon');


suite('employee', function () {
  suite('checkListUsername()', function () {
    test('should return undefined when the username if not present', function () {
      var testUsername = new employee();
      assert(testUsername.checkListUsername('chim') !== true, 'This user existed');
    });
  });
});

suite('employee', function () {
  suite('getEmployeesByRole()', function () {
    test('should return false if not found that employrr', function (done) {
      var employeeTest = new employee();
      var finalString = employeeTest.getEmployeesByRole(5);    
      assert(finalString!==false,'fail suffling');
        done();
    });
  });
});