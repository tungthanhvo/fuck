var models = require('../models/index');

function metaDataService() {
	this.loadJobTitle = function () {
		return models.job_title.findAll({
			attributes: ['id', 'name'],
			order: [['name', 'ASC']]
		});
	};

	this.loadSkill = function () {
		return models.skill.findAll({
			attributes: ['id', 'name'],
			where: {
				level: 1
			},
			order: [['name', 'ASC']]
		});
	};

	this.loadCompetenceJob = function () {
		return models.competence_job_title.findAll({
			attributes: [],
			include: [{
				model: models.job_title
			},
				{
					model: models.competence,
					attributes: ['id', 'name'],
					order: [['name', 'ASC']],
					include: [{
						model: models.department,
						attributes: ['id', 'name'],
						order: [['name', 'ASC']]
					}]
				}]
		});
	};

	this.loadExperience = function () {
		return models.experience.findAll({
			attributes: ['id', 'description', 'level'],
			order: [['level', 'ASC']]
		});
	};

	this.loadExpertise = function () {
		return models.expertise.findAll({
			attributes: ['id', 'description', 'level'],
			order: [['level', 'ASC']]
		});
	};

	this.loadRole = function () {
		return models.role.findAll({
			attributes: ['id', 'name'],
			order: [['name', 'ASC']]
		});
	};

	this.loadTechnicalSkill = function () {
		return models.technical_skill.findAll({
			attributes: ['id', 'name'],
			order: [['name', 'ASC']]
		});
	};

	this.loadLocation = function () {
		return models.location.findAll({
			attributes: ['id', 'name'],
			order: [['name', 'ASC']]
		});
	};

	this.loadType = function () {
		return models.type.findAll({
			attributes: ['id', 'name'],
			order: [['name', 'ASC']]
		});
	};

	this.loadStatus = function () {
		return models.status.findAll({
			attributes: ['id', 'name'],
			order: [['name', 'ASC']]
		});
	};

	this.loadClientIndustry = function () {
		return models.client_industry.findAll({
			attributes: ['id', 'name'],
			order: [['name', 'ASC']]
		});
	};

	this.loadProject = function () {
		return models.project.findAll({
			attributes: ['id', 'name'],
			order: [['name', 'ASC']]
		});
	};

	this.loadProjectRole = function () {
		return models.project_role.findAll({
			attributes: ['id', 'name'],
			where:{
				is_selected: 0
			},
			order: [['name', 'ASC']]
		});
	};
}

module.exports = metaDataService;