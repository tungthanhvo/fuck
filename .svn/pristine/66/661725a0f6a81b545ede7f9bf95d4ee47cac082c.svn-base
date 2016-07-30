module.exports = function(sequelize, DataTypes){  
	var experience = sequelize.define('experience', {
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
                experience.hasMany(models.skill_metric, {
                    foreignKey: {
                        name: 'experience_id',
                        allowNull: false
                    }
                });
            }
		}
	});
	return experience;
}



