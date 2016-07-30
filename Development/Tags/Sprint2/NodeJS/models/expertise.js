module.exports = function(sequelize, DataTypes){  
	var expertise = sequelize.define('expertise', {
		level: {
			type: DataTypes.INTEGER,
			allowNull: false
		},		
		description: {
			type: DataTypes.STRING(500),
			allowNull: false
		},
	}, {
		underscored: true,
		freezeTableName: true,
		classMethods: {
			associate: function(models) {
                expertise.hasMany(models.skill_metric, {
                    foreignKey: {
                        name: 'expertise_id',
                        allowNull: false
                    }
                });
            }
		}
	});
	return expertise;
}

