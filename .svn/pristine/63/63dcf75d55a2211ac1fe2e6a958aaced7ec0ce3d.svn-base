module.exports = function (sequelize, DataTypes) {
	var competence = sequelize.define('competence', {
		name: {
			type: DataTypes.STRING(100),
			allowNull: false
		}
	}, {
			underscored: true,
			freezeTableName: true,
			collate: 'utf8_general_ci',
			classMethods: {
				associate: function (models) {
					competence.belongsTo(models.department, {
						foreignKey: {
							name: 'department_id',
							allowNull: false
						}
					});
					competence.hasMany(models.competence_job_title, {
						foreignKey: {
							name: 'competence_id',
							allowNull: false
						}
					});
				}
			}
		});
	return competence;
};


