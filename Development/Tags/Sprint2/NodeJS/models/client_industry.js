module.exports = function(sequelize, DataTypes){     
	var client_industry = sequelize.define('client_industry', {
		name: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
		}, {
            underscored: true,
			freezeTableName: true,
			classMethods: {
            associate: function(models) {
                client_industry.hasMany(models.project, {
                    foreignKey: {
                        name: 'client_industry_id',
                        allowNull: true
                    }
                });
            }
        }
		});
	return client_industry;
};
