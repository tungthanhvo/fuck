var assert = require('chai').assert;
var project = require('../services/projects');
var expect = require('chai').expect;
var sinon = require('sinon');

suite('project', function () {
    suite('retrieve a project by id of it', function () {
        test('should return true if have educations', function (done) {
            var testProject = new project();
            var finalString = testProject.retrieve(1, function (data) {
                setTimeout(function () {
                    assert(data != null, 'successfully retrieve');
                    done();
                }, 50);

            }, function (error) {
                setTimeout(function () {
                    assert(error != null, 'fail retrieve');
                    done();
                }, 50);
            });
        });
    });
});

suite('project', function () {
    suite('update() delete()', function () {
        var tempproject = null;
        before(function () {
            tempproject = {
                "id": 1,
                "name": "TMS-Nodejs-1",
                "start_date": "2000-06-30T00:00:00.000Z",
                "end_date": "2015-06-30T00:00:00.000Z",
                "size": 31,
                "short_description": "short description TMS-Nodejs-1",
                "long_description": "TMS-Nodejs-1 makes a TMS software for HarveyNash",
                "technology": "NODEJS for back-end, ANGULARJS for front-end",
                "client_name": "HarveyNash",
                "is_included": true,
                "client_industry_id": 2,
                "location_id": 2,
                "type_id": 2,
                "status_id": 1,
                "project_manager": {
                    "id": 1,
                    "user_id": 4
                },
                "program_manager": {
                    "id": 2,
                    "user_id": 5
                },
                "engagement_manager": {
                    "id": 3,
                    "user_id": 5
                }
            }
        });
        test('should update a project if update successfully', function (done) {
            var testProject = new project();
            var finalString = testProject.update(tempproject, function (data) {
                setTimeout(function () {
                    assert(data != null, 'successfully update');
                    done();
                }, 50);
            }, function (error) {
                assert(error != null, 'fail update');
                done();
            });
        });
        test('should delete a project if delete successfully', function (done) {
            var testProject = new project();
            var finalString = testProject.delete(tempproject.id, function (data) {
                setTimeout(function () {
                    assert(data != null, 'successfully delete');
                    done();
                }, 50);
            }, function (error) {
                assert(error != null, 'fail delete');
                done();
            });
        });
    });
});

suite('project', function () {
    suite('create()', function () {
        before(function () {
            tempproject = {
                "name": "My random Project",
                "dt": "2000-06-30T00:00:00.000Z",
                "enddate": "2015-06-30T00:00:00.000Z",
                "size": 31,
                "shortdescription": "Short Description String",
                "longdescription": "Long Description String",
                "technologies": "Technology",
                "clientname": "HarveyNash",
                "is_included": true,
                "clientindustry": 2,
                "location": 2,
                "type": 2,
                "status": 1,
                "manager": 4,
                "deliverymanager": 5,
                "engagementmanager": 6
            }
        });
        test('should create project with valid data', function (done) {
            var testProject = new project();
            testProject.create(tempproject, function (data, project_id) {
                assert(project_id !== null, 'No project was created.');
                done();
            });
        });
        // test('should not create if name existed', function (done) {
        //     var testProject = new project();
        //     tempproject.name = 'TMS-Nodejs-1';
        //     testProject.create(tempproject, function (data, project_id) {
        //         assert(project_id !== null, 'No project was created.');
        //         done();
        //     });
        // });
    });
});