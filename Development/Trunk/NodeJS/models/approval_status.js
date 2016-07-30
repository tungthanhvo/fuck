module.exports = function(sequelize, DataTypes){     
	var status = sequelize.define('approval_status', {
		name: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
		}, {
            underscored: true,
			freezeTableName: true,
            collate: 'utf8_general_ci',
			classMethods: {
            associate: function(models) {
                status.hasMany(models.project_user, {
                    foreignKey: {
                        name: 'approval_status_id',
                        allowNull: true
                    }
                });
            }
        }
		});
	return status;
};
