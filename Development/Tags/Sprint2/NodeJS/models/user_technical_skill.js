module.exports = function(sequelize, DataTypes){      
	var user_technical_skill = sequelize.define('user_technical_skill', {
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
	}, {
        underscored: true,
  		freezeTableName: true,
  		classMethods: {
            associate: function(models) {
                user_technical_skill.belongsTo(models.user, {
	                    foreignKey: {
	                        name: 'user_id',
	                        allowNull: false
	                    }
	                });
	                user_technical_skill.belongsTo(models.technical_skill, {
	                    foreignKey: {
	                        name: 'technical_skill_id',
	                        allowNull: false
	                    }
	                });
            }
        }
  	});
  	return user_technical_skill;
};

