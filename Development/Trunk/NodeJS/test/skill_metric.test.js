var models = require('../models/index');
var account = require('../services/accountService');
var assert = require('chai').assert;
var account = require('../services/accountService');
var skill = require('../services/skill_metric')
var expect = require('chai').expect;
var sinon = require('sinon');


suite('skill', function() {
    suite('delete()', function() {
        test('should return true if found', function(done) {
            var testSkill = new skill();
            var finalString = testSkill.delete(5);
            assert(finalString !== false, 'not found');
            done();
        });
    });
});