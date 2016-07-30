var models = require('../models_temp/index');

function metaDataService(){
	var final = {};
	this.loadMetaData = function(){
		return models.job_title.findAll({
			attributes: ['id', 'name']
		})
	}

	this.loadSkill = function(){
		return models.skill.findAll({
			attributes: ['id', 'name']
		});		
	}

	this.loadCompetenceJob = function(){
		return models.competence_job_title.findAll({
			attributes:[],
			include: [{
				model: models.job_title
			},
			{
				model: models.competence,
				attributes: ['id', 'name'],
				include: [{
					model: models.department,
					attributes: ['id', 'name']
				}]
			}]
		});
	}	

	this.loadExperience = function(){
		return models.experience.findAll({
			attributes: ['id', 'description', 'level']
		})
	}

	this.loadExpertise = function(){
		return models.expertise.findAll({
			attributes: ['id', 'description', 'level']
		})
	}

	this.loadRole = function(){
		return models.role.findAll({
			attributes: ['id', 'name']
		})
	}
	
	this.loadTechnicalSkill = function(){
		return models.technical_skill.findAll({
			attributes: ['id', 'name']
		})
	}
	
}

module.exports = metaDataService;