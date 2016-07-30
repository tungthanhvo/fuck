var config = require('./config');
config.sequelize.sync();
    

var course = require('./Models/course');
var skill_metric = require('./Models/skill_metric');
var department = require('./Models/department');
var education = require('./Models/education');
var employee_history = require('./Models/employee_history');
var experience = require('./Models/experience');
var expertise = require('./Models/expertise');
var job_title = require('./Models/job_title');
var role = require('./Models/role');
var skill = require('./Models/skill');
var competence = require('./Models/competence');
var competence_job_title = require('./Models/competence_job_title');
var user = require('./Models/user');




user.hasMany(course, {foreignKey: 'user_ID'});
user.hasMany(skill_metric, {foreignKey: 'user_ID'});
user.hasMany(employee_history, {foreignKey: 'user_ID'});
user.hasMany(education, {foreignKey: 'user_ID'});

department.hasMany(competence,{foreignKey: 'department_ID'});
competence.hasMany(competence_job_title,{foreignKey: 'competence_ID'});
competence_job_title.hasMany(user, {foreignKey: 'competence_job_title_ID'});
job_title.hasMany(competence_job_title, {foreignKey: 'job_title_ID'});
role.hasMany(user, {foreignKey: 'role_ID'});
skill.hasMany(skill_metric, {foreignKey: 'skill_ID'});
expertise.hasMany(skill_metric, {foreignKey: 'expertise_ID'});
experience.hasMany(skill_metric, {foreignKey: 'experience_ID'});


course.create({course_name: '123131321'});