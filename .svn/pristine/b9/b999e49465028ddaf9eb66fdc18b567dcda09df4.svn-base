module.exports = function(sequelize, DataTypes){      
	var competence_job_title = sequelize.define('competence_job_title', {
	}, {
  		freezeTableName: true,
  		classMethods: {
            associate: function(models) {
                competence_job_title.hasMany(models.user, {
	                    foreignKey: {
	                        name: 'competence_job_title_id',
	                        allowNull: false
	                    }
	                });
	                competence_job_title.belongsTo(models.competence, {
	                    foreignKey: {
	                        name: 'competence_id',
	                        allowNull: false
	                    }
	                });
	                competence_job_title.belongsTo(models.job_title, {
	                    foreignKey: {
	                        name: 'job_title_id',
	                        allowNull: false
	                    }
	                });
            }
        }
  	});
  	return competence_job_title;
}

