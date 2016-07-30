var models = require('../models/index');
var cv_export_service = require('../services/cv_export_service');
var assert = require('chai').assert;
var expect = require('chai').expect;
var sinon = require('sinon');

suite('CV', function () {
  suite('getUserInfo()', function () {
    test('should return data of a user based on id if it exists', function () {
      var cv_instance = new cv_export_service();
      assert(cv_instance.getUserInfo(1) === true, 'This user existed');
    });
  });
});