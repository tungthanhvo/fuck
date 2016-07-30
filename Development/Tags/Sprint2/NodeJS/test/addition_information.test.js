var models = require('../models/index');
var account = require('../services/accountService');
var assert = require('chai').assert;
var addition_information = require('../services/addition_information');
var employee = require('../services/employee-create');
var expect = require('chai').expect;
var sinon = require('sinon');


suite('addition_information', function () {
  suite('retrieveAdditionInformationByUser_Id()', function () {
    test('should return false if not found', function (done) {
      var testAdditonalInformation = new addition_information();
      var finalString = testAdditonalInformation.retrieveAdditionInformationByUser_Id(5);    
      assert(finalString!==true,'fail retrieving');
        done();
    });
  });
});

suite('addition_information', function () {
  suite('update()', function () {
    test('should return false if not found', function (done) {
      var testAdditonalInformation = new addition_information();
      var params={
          id: 5,
          updated_at: null,
          created_at: null
      };
      var finalString = testAdditonalInformation.update(params);    
      assert(finalString!==true,'fail updating');
        done();
    });
  });
});
