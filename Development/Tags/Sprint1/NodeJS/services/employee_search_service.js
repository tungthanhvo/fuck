var models = require('../models_temp/index');
var fs = require('fs');
function employeeService() {
    //models.Sequelize.literal('DISTINCT id'),
    this.searchUser = function (first_name1, last_name1, job_title1, course1, technical_skill1, skill_metric1, expertise_level_from1, expertise_level_to1, employment_status1,offset1) {
        var expertiseRequired = true;
        console.log('+++++++++ '+expertise_level_from1);
        if(expertise_level_from1 === null || expertise_level_from1 === undefined) {
            expertise_level_from1 = 1;
        }
        if(expertise_level_to1 === null || expertise_level_to1 === undefined) {expertise_level_to1 = 5;}
        if(expertise_level_from1 === 1 && expertise_level_to1 ===5) expertiseRequired =false;
        var courseRequired = false;
        console.log(course1);
        if(course1 !== null && course1 !== undefined) courseRequired = true; 
        console.log(courseRequired);
        offset1 = (offset1-1) *6;
        console.log("offset1: " + offset1);
        var limitCondition=6;
        var offsetCondition=offset1;
        var technical_skillRequired = false;
        var job_titleRequired = false;
        var skillRequired = false;
        var skill_metricRequired = false;
        var competence_job_titleRequired = false;    
        var user_technical_skillRequired = false;  
        console.log('frommmmmmmmm: '+expertise_level_from1 + expertiseRequired);  
        if(technical_skill1 !== undefined && technical_skill1 !== null) technical_skillRequired = true;
        if(job_title1 !== undefined && job_title1 !== null) job_titleRequired = true;
        if(skill_metric1 !== undefined && skill_metric1 !== null) skillRequired = true;
        if(skillRequired === true) skill_metricRequired = true;
        if(technical_skillRequired === true) user_technical_skillRequired = true;
        if(job_titleRequired === true) competence_job_titleRequired = true;
        console.log('test: '+expertiseRequired);
        return models.user.findAndCountAll({
            attributes: ['id', 'first_name', 'last_name', 'company_join_date'],            
            //limit: limitCondition,
            //offset: offset1,            
            subQuery:false,
            logging : function(str) {            
                fs.writeFile("C:\\Users\\langbuinl\\Desktop\\TMS\\Development\\Trunk\\NodeJS\\sql.log", str, function(err) {
                    if(err) {
                        return console.log(err);
                    }
                console.log("The file was saved!");
            })
            },
            include: [{
                model: models.competence_job_title,
                attributes: ['id'],
                required: competence_job_titleRequired,
                include: [{
                    model: models.job_title,
                    attributes: ['name'],
                    required: job_titleRequired,
                    where: {
                        name: { $like: '%' + (job_title1 || '') + '%' }
                    }
                }]
            },
                {
                    model: models.user_technical_skill,
                    attributes: ['id'],
                    required: user_technical_skillRequired,
                    include: [{
                        model: models.technical_skill,
                        attributes: ['name'],
                        required: technical_skillRequired,
                        where: {
                            name: { $like: '%' + (technical_skill1 || '') + '%' }
                        }
                    },]
                },
                {
                    model: models.course,
                    attributes: [],
                    required: courseRequired,
                    where: {
                        course_name: { $like: '%'+ (course1 || '') + '%' }
                    }
                },
                {
                    model: models.skill_metric,
                    attributes: [],
                    required: skill_metricRequired,
                    include: [{
                        model: models.skill,
                    attributes: [],
                        required: skillRequired,
                        where: {
                            name: { $like: '%' + (skill_metric1 || '') + '%' }
                        }
                    }, {
                            model: models.expertise,
                            attributes: [],
                            required: expertiseRequired,
                            where: {
                                $and: {
                                    level: {
                                        $between: [expertise_level_from1, expertise_level_to1]
                                    }
                                }
                            }
                        }
                    ]
                }
            ],
            order:[['first_name', 'ASC'],['last_name','ASC']],
            where: {
                first_name: { $like: '%' + (first_name1 || '') + '%' },
                last_name: { $like: '%' + (last_name1 || '') + '%' }
            }
        }
        );
    };
    this.searchCourse = function () {
        return models.course.findAll({ raw: true });
    };
    this.searchSkillMetric = function () {
        return models.skill_metric.findAll({ raw: true });
    };
    this.searchSkill = function () {
        return models.skill.findAll({ raw: true });
    };
    this.searchExpertise = function () {
        return models.expertise.findAll({ raw: true });
    };
    this.searchExperience = function () {
        return models.experience.findAll({ raw: true });
    };
    this.searchEmployeeHistory = function () {
        return models.employee_history.findAll({ raw: true });
    };
    this.searchEducation = function () {
        return models.education.findAll({ raw: true });
    };
    this.searchRole = function () {
        return models.role.findAll({ raw: true });
    };
    this.searchDepartment = function () {
        return models.department.findAll({ raw: true });
    };
    this.searchCompetence = function () {
        return models.competence.findAll({ raw: true });
    };
    this.searchCompetenceJobTitle = function () {
        return models.competence_job_title.findAll({ raw: true });
    };
    this.searchJobTitle = function () {
        return models.job_title.findAll({ raw: true });
    };
    this.searchTechnicalSkill = function () {
        return models.technical_skill.findAll({ raw: true });
    };
    this.searchByCriteria = function (req) {
        console.log('entered search');
    };
}
module.exports = employeeService;

