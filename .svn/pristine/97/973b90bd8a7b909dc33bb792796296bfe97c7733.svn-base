var assert = require('chai').assert;
var course = require('../services/course');
var expect = require('chai').expect;
var sinon = require('sinon');

suite('course', function() {
    suite('retrieveAllByUser_Id()', function() {
        test('should return true if have courses', function(done) {
            var testCourse = new course();
            var finalString = testCourse.retrieveAllByUser_Id(1, function(data) {
                setTimeout(function() {
                    assert(data != null, 'successfully retrieve');
                    done();
                }, 50);
            }, function(error) {
                setTimeout(function() {
                    assert(error != null, 'fail retrieve');
                    done();
                }, 50);
            });
        });
    });
});

suite('course', function() {
    suite('create() update() delete()', function() {
        var cos = null;
        before(function() {
            cos = {
                from_year: 1990,
                to_year: 2000,
                course_name: "Lap Trinh Hien Dai",
                course_description: "Hoc nhung mon ve khoa hoc web, cach lam web",
                achievement: "degree award",
                user_id: 1
            }
        });
        test('should return id of entered course if create successfully', function(done) {
            var testCourse = new course();
            var finalString = testCourse.create(cos, function(data) {
                setTimeout(function() {
                    cos.id = data.dataValues.id;
                    assert.notEqual(data.dataValues.id, 0, 'true');
                    done();
                }, 50);
            }, function(error) {
                assert(error != null, 'fail create');
                done();
            });
        });
        test('should return id > 0 if update successfully', function(done) {
            var testCourse = new course();
            cos.course_name = "Lap Trinh Hien Dai 2";
            var finalString = testCourse.update(cos, function(data) {
                setTimeout(function() {
                    assert(data.length == 1, 'true');
                    done();
                }, 50);
            }, function(error) {
                console.log(error);
                assert(error != null, 'fail update');
                done();
            });
        });

        test('should return true if delete successfully', function(done) {
            var testCourse = new course();
            var finalString = testCourse.delete(cos.id, function(data) {
                setTimeout(function() {
                    assert.equal(data, 1, 'true');
                    done();
                }, 50);
            }, function(error) {
                console.log(error);
                assert(error != null, 'fail delete');
                done();
            });
        });

    });
});