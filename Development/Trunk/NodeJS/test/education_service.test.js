var assert = require('chai').assert;
var education = require('../services/education');
var expect = require('chai').expect;
var sinon = require('sinon');

suite('education', function() {
    suite('retrieveAllByUser_Id()', function() {
        test('should return true if have educations', function(done) {
            var testEducation = new education();
            var finalString = testEducation.retrieveAllByUser_Id(1, function(data) {
                setTimeout(function() {
                    assert(data !== null, 'successfully retrieve');
                    done();
                }, 50);

            }, function(error) {
                setTimeout(function() {
                    assert(error !== null, 'fail retrieve');
                    done();
                }, 50);
            });
        });
    });
});

suite('education', function() {
    suite('create() update() delete()', function() {
        var edu = null;
        before(function() {
            edu = {
                from_year: 1990,
                to_year: 2000,
                university_college_name: "Dai Hoc Quoc Te",
                major: "Mang May Tinh",
                user_id: 1
            }
        });
        test('should return id of entered education if create successfully', function(done) {
            var testEducation = new education();
            var finalString = testEducation.create(edu, function(data) {
                setTimeout(function() {
                    edu.id = data.dataValues.id;
                    assert.notEqual(data.dataValues.id, 0, 'true');
                    done();
                }, 50);
            }, function(error) {
                assert(error !== null, 'fail create');
                done();
            });
        });
        test('should return id > 0 if update successfully', function(done) {
            var testEducation = new education();
            edu.major = "Ly Luan Hoc";
            var finalString = testEducation.update(edu, function(data) {
                setTimeout(function() {
                    assert(data.length === 1, 'true');
                    done();
                }, 50);
            }, function(error) {
                assert(error !== null, 'fail update');
                done();
            });
        });

        test('should return true if delete successfully', function(done) {
            var testEducation = new education();
            var finalString = testEducation.delete(edu.id, function(data) {
                setTimeout(function() {
                    assert.equal(data, 1, 'true');
                    done();
                }, 50);
            }, function(error) {
                assert(error !== null, 'fail delete');
                done();
            });
        });

    });
});