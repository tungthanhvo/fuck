module.exports = function(sequelize, DataTypes){     
	var status = sequelize.define('status', {
		name: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
		}, {
            underscored: true,
			freezeTableName: true,
			classMethods: {
            associate: function(models) {
                status.hasMany(models.project, {
                    foreignKey: {
                        name: 'status_id',
                        allowNull: false
                    }
                });
            }
        }
		});
	return status;
};
