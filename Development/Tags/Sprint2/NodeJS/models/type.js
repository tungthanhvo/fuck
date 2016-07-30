module.exports = function(sequelize, DataTypes){     
	var type = sequelize.define('type', {
		name: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
		}, {
            underscored: true,
			freezeTableName: true,
			classMethods: {
            associate: function(models) {
                type.hasMany(models.project, {
                    foreignKey: {
                        name: 'type_id',
                        allowNull: false
                    }
                });
            }
        }
		});
	return type;
};
