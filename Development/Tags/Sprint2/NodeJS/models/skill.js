module.exports = function(sequelize, DataTypes){  
    var skill = sequelize.define('skill', {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        underscored: true,
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                skill.hasMany(models.skill_metric, {
                    foreignKey: {
                        name: 'skill_id',
                        allowNull: false
                    }
                });
            }
        }
    });    
    return skill;
};


