var models = require('../models/index');

function employeeUpdate(){
	this.loadSkillChildren = function(){
		return models.skill.findAll({
			attributes: ['id', 'name', 'parent_id'],
            where:{
                level: 1
            }
		});
	};

	this.loadSkillParents = function(){
		return models.skill.findAll({
			attributes: ['id', 'name'],
            where: {
                level: 0
            }
		});		
	};

	this.loadSkillMetric = function(id){
		return models.skill_metric.findAll({
			attributes:['id','is_verified','verified_day'],
            where:{
                user_id: id
            },
			include: [{
				model: models.skill,
                attributes: ['id','parent_id']
			}]
		});
	};	

	
}

module.exports = employeeUpdate;