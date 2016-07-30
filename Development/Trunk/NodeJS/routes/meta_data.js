var express = require('express');
var metadata_router = express.Router();
var metadataService = require('../services/meta_data_service');
var employeeUpdate = require('../services/employee_update');

metadata_router.get('/', function (req, res) {
    var metadata_service = new metadataService();
    var search = new employeeUpdate();
    var a = {};

    var load_job_title = function () {
        return metadata_service.loadJobTitle();
    };

    var load_skill = function (job_title_result) {
        a.job = job_title_result;
        return metadata_service.loadSkill();
    };

    var load_competence_job = function (skill_result) {
        a.skill = skill_result;
        return metadata_service.loadCompetenceJob();
    };

    var load_experience = function (competence_job_result) {
        a.competenceJob = competence_job_result;
        return metadata_service.loadExperience();
    };

    var load_expertise = function (experience_result) {
        a.experience = experience_result;
        return metadata_service.loadExpertise();
    };

    var load_role = function (expertise_result) {
        a.expertise = expertise_result;
        return metadata_service.loadRole();
    };

    var load_technical_skill = function (role_result) {
        a.role = role_result;
        return metadata_service.loadTechnicalSkill();
    };

    var load_skill_children = function (technical_skill_result) {
        a.technicalSkill = technical_skill_result;
        return search.loadSkillChildren();
    };

    var load_skill_parrent = function (skill_children_result) {
        a.skillChildren = skill_children_result;
        return search.loadSkillParents();
    };

    var load_location = function (skill_parrent_result) {
        a.skillParents = skill_parrent_result;
        a.skillChildren.forEach(function (result4) {
            var index_parentid = result4.parent_id - 1;
            result4.parent_id = a.skillParents[index_parentid].name;
        });
        return metadata_service.loadLocation();
    };

    var load_type = function (location_result) {
        a.location = location_result;
        return metadata_service.loadType();
    };

    var load_status = function (type_result) {
        a.type = type_result;
        return metadata_service.loadStatus();
    };

    var load_client_industry = function (status_result) {
        a.status = status_result;
        return metadata_service.loadClientIndustry();
    };

    var load_project = function (client_industry_result) {
        a.client_industry = client_industry_result;
        return metadata_service.loadProject();
    };

    var load_project_role = function (project_result) {
        a.project = project_result;
        return metadata_service.loadProjectRole();  
    };
    
    var load_final = function (project_role_result) {
        a.project_role = project_role_result;
        res.json(a);
    };

    var err = function (errors) {
        res.status(400).json({
            code: 400,
            message: err
        });
    };
    
    //usage: if want to add anything, add it at beginning rows with then argument is next variable and substitute before then
    var loadJobTitle = load_job_title().then(load_skill);
    var loadCompetenceJob = loadJobTitle.then(load_competence_job);
    var loadExperience = loadCompetenceJob.then(load_experience);
    var loadExpertise = loadExperience.then(load_expertise);
    var loadRole = loadExpertise.then(load_role);
    var loadTechnicalSkill = loadRole.then(load_technical_skill);
    var loadSkillChildren = loadTechnicalSkill.then(load_skill_children);
    var loadSkillParents = loadSkillChildren.then(load_skill_parrent);
    var loadLocation = loadSkillParents.then(load_location);
    var loadType = loadLocation.then(load_type);
    var loadStatus = loadType.then(load_status);
    var loadClientIndustry = loadStatus.then(load_client_industry);
    var loadProject = loadClientIndustry.then(load_project);
    var loadProjectRole = loadProject.then(load_project_role);
    loadProjectRole.then(load_final).catch(err);
});

metadata_router.get('/loadskillchildren', function (req, res) {
    var search = new employeeUpdate();
    search.loadSkillChildren().then(function (result) {
        res.json(result);
    });
});

metadata_router.get('/loadskillparents', function (req, res) {
    var search = new employeeUpdate();
    search.loadSkillParents().then(function (result) {
        res.json(result);
    });
});

metadata_router.get('/loadskillmetric', function (req, res) {
    var search = new employeeUpdate();
    search.loadSkillChildren(req.query.id).then(function (result) {
        res.json(result);
    });
});

module.exports = metadata_router;