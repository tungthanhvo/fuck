var assert = require('chai').assert;
var project = require('../services/project_member');
var expect = require('chai').expect;
var sinon = require('sinon');

suite('project_member', function (params) {
    var temp_project_member = {}
    before(function () {
        temp_project_member.description = '';
        temp_project_member.dt = '2016-06-29';
        temp_project_member.name = '9';
        temp_project_member.project_id = '1';
        temp_project_member.releasedate = '2016-06-29';
        temp_project_member.roletitle = '7';        
    });
    test('get all member in a project', function (done) {
        var project_instance = new project();
        project_instance.getAllMemberInProject(1, function (data) {
           assert(data != null, 'No data retrieved');
           done(); 
        }, function (err) {
            assert(data == null, `Error thrown: ${err}`);
            done();
        });
    })
    test('add a member to project', function (done) {
        var project_instance = new project();
        project_instance.addMemberToProject(temp_project_member, function (data) {
            assert(data != null, 'No data retrieved');
            done();
        }, function (err) {
            assert(data == null, `Error thrown: ${err}` );
        });
        done();
    })
})