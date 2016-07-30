var models = require('../models/index');
var fs = require('fs');
function employeeService() {
    var userModel = models.user;

    this.setModel = function(model) {
         userModel = model;
         return true;
    };
    
    this.searchUser = function (query) {
        var expertiseRequired = true;
        var courseRequired = false;
        var technical_skillRequired = false;
        var job_titleRequired = false;
        var skillRequired = false;
        var skill_metricRequired = false;
        var competence_job_titleRequired = false;    
        var user_technical_skillRequired = false;
        var project_userRequired = false;
        var projectWhere = {};
        var skillWhere = {};
        var job_titleWhere = {};

        if(!query.expertise_level_from && !query.expertise_level_to) {
            expertiseRequired = false;
        } else if(!query.expertise_level_from) {
            query.expertise_level_from1 = 1;
        } else if(!query.expertise_level_to) {
            query.expertise_level_to1 = 5;
        }
        if(query.course) {
            courseRequired = true;
        }
        if(query.technical_skill) {
            technical_skillRequired = true;
        }
        if(query.skill_metric){
            skillRequired = true;
        }
        if(query.job_title) {
            job_titleWhere = {
                id: query.job_title
            };
            job_titleRequired = true;
        }
        if(query.skill_metric) {
            skill_metricRequired = true;
        }
        if(query.skill_metric){
            skillWhere = {
                            id: query.skill_metric
                        };
            skillRequired = true;
        }
        if(skillRequired === true) {
            skill_metricRequired = true;
        }
        if(technical_skillRequired === true) {
            user_technical_skillRequired = true;
        }
        if(job_titleRequired === true) {
            competence_job_titleRequired = true;
        }
        if(query.project_id){
            projectWhere = {
                project_id: query.project_id
            };
            project_userRequired = true;
        }        
        var skill = {
                        model: models.skill,
                        attributes: [],
                        required: skillRequired,
                        where: skillWhere
                    };
        var job_title = {
                    model: models.job_title,
                    attributes: ['name'],
                    required: job_titleRequired,
                    where: job_titleWhere
                };
        var technical_skill = {
                        model: models.technical_skill,
                        attributes: ['name'],
                        required: technical_skillRequired,
                        where: {
                            name: { $like: '%' + (query.technical_skill || '') + '%' }
                        }
                    };
        var user_technical_skill = {
                    model: models.user_technical_skill,
                    attributes: ['id'],
                    required: user_technical_skillRequired,
                    include: [technical_skill]
                };
        var competence_job_title = {
                model: models.competence_job_title,
                attributes: ['id'],
                required: competence_job_titleRequired,
                include: [job_title]
            };
        var course = {
                    model: models.course,
                    attributes: [],
                    required: courseRequired,
                    where: {
                        course_name: { $like: '%'+ (query.course || '') + '%' }
                    }
                };        
        var expertise_level = {
                            model: models.expertise,
                            attributes: [],
                            required: expertiseRequired,
                            where: {
                                $and: {
                                    level: {
                                        $between: [query.expertise_level_from, query.expertise_level_to]
                                    }
                                }
                            }
                        };
        var skill_metric = {
                    model: models.skill_metric,
                    attributes: [],
                    required: skill_metricRequired,
                    include: [skill, expertise_level]
                };
        var project_user = {
            model: models.project_user,
            attributes: ['id', 'project_id'],
            where: projectWhere,
            required: project_userRequired,
            include:[{
                model: models.project,
                required: project_userRequired,
                include:{
                    model: models.status,
                    required: false
                }
            }]
        };
        return userModel.findAndCountAll({
            attributes: ['id', 'first_name', 'last_name', 'company_join_date'],      
            subQuery:false,
            include: [ competence_job_title, user_technical_skill, course, skill_metric, project_user],
            order:[['first_name', 'ASC'],['last_name','ASC']],
            where: {
                first_name: { $like: '%' + (query.first_name || '') + '%' },
                last_name: { $like: '%' + (query.last_name || '') + '%' }
            }
        });
    };

    this.searchProject = function(){
        return models.project.findAndCountAll({
                attributes: ['id', 'name', 'status_id'],
                include: [{
                    model: models.status,
                    required: true,
                    where: {
                        name: 'Running'
                    }
                }]
            });         
                
    };
}
module.exports = employeeService;

