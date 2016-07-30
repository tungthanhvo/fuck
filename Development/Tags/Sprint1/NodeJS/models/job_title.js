module.exports = function(sequelize, DataTypes){     
	var job_title = sequelize.define('job_title', {
		name: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
		}, {
            underscored: true,
			freezeTableName: true,
			classMethods: {
            associate: function(models) {
                job_title.hasMany(models.competence_job_title, {
                    foreignKey: {
                        name: 'job_title_id',
                        allowNull: false
                    }
                });
            }
        }
		});
	return job_title;
};
