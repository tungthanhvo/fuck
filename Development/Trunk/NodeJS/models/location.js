module.exports = function(sequelize, DataTypes){     
	var location = sequelize.define('location', {
		name: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
		}, {
            underscored: true,
			freezeTableName: true,
            collate: 'utf8_general_ci',
			classMethods: {
            associate: function(models) {
                location.hasMany(models.project, {
                    foreignKey: {
                        name: 'location_id',
                        allowNull: true
                    }
                });
            }
        }
		});
	return location;
};