module.exports = function(sequelize, DataTypes){  
    var technical_skill = sequelize.define('technical_skill', {
        name: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    }, {
        underscored: true,
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                technical_skill.hasMany(models.user_technical_skill, {
                    foreignKey: {
                        name: 'technical_skill_id',
                        allowNull: false
                    }
                });
            }
        }
    });    
    return technical_skill;
};


