var models = require('../models/index');
var fs = require('fs');

function employeeService() {
    var projectModel = models.project;

    this.setModel = function(model) {
        projectModel = model.project;
        return true;
    };


    this.a = function() {        
       return  models.project.findAndCountAll({
        })
        // .then(function (result) {
        //     return result;
        // });
    };   
}
module.exports = employeeService;