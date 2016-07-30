var assert = require('chai').assert;
var employee_history = require('../services/employee_history');
var expect = require('chai').expect;
var sinon = require('sinon');

suite('employee_history', function() {
    suite('retrieveAllByUser_Id()', function() {
        test('should return true if have employee_historys', function(done) {
            var testemployee_history = new employee_history();
            var finalString = testemployee_history.retrieveAllByUser_Id(1, function(data) {
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

suite('employee_history', function() {
    suite('create() update() delete()', function() {
        var emphistory = null;
        before(function() {
            emphistory = {
                from_year: 1990,
                to_year: 2000,
                company_name: "ABC company",
                position: "DEVS",
                user_id: 1
            }
        });
        test('should return id of entered employee_history if create successfully', function(done) {
            var testemployee_history = new employee_history();
            var finalString = testemployee_history.create(emphistory, function(data) {
                setTimeout(function() {
                    emphistory.id = data.dataValues.id;
                    assert.notEqual(data.dataValues.id, 0, 'true');
                    done();
                }, 50);
            }, function(error) {
                assert(error != null, 'fail create');
                done();
            });
        });
        test('should return id > 0 if update successfully', function(done) {
            var testemployee_history = new employee_history();
            emphistory.position = "Senior";
            var finalString = testemployee_history.update(emphistory, function(data) {
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
            var testemployee_history = new employee_history();
            var finalString = testemployee_history.delete(emphistory.id, function(data) {
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