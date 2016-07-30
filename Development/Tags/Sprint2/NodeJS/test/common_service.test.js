var models = require('../models/index');
var assert = require('chai').assert;
var common_service = require('../services/commonService');
var expect = require('chai').expect;
var sinon = require('sinon');


suite('common', function () {
    suite('getCompetencesByDepartmentID()', function () {
        test('should return undefined when departmentID not exists', function () {
            var test_service = new common_service();
            assert(test_service.getCompetencesByDepartmentID(21) !== true, 'The department does not existed');
        });
    });
});