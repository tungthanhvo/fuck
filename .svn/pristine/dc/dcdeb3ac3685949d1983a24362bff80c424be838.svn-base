var models = require('../models_temp/index');
var search = require('../services/employee_search_service');
var assert = require('chai').assert;
var account = require('../services/accountService');
var employee = require('../services/employee-create')

describe('Search', function() {
  describe('searchUser()', function () {
    it('should return undefined when the user if not present', function () {
      var testSearch = new search();
      testSearch.searchUser().then(function (result) {
          console.log('==========');
          console.log(result);
          assert(result.count>0,'There are many users found');
        });      
    });
  });
});


describe('account', function() {
  describe('expiresInday()', function () {
    it('should return undefined when the user if not present', function () {
      var testAccount = new account();      
          assert(testAccount.expiresInDay(5)>1467773626806,'This is the expired day'); 
    });
  });
});

describe('employee', function() {
  describe('checkListUsername()', function () {
    it('should return undefined when the username if not present', function () {
      var testUsername = new employee();      
          assert(testUsername.checkListUsername('chim')!==true,'This user existed'); 
    });
  });
});