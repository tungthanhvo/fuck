module.exports = function(sequelize, DataTypes){
    var skill_metric = sequelize.define('skill_metric', {
        last_year_used: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },        
        verified_userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        verified_day: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                skill_metric.belongsTo(models.skill, {
                        foreignKey: {
                            name:'skill_id', 
                            allowNull: false
                        }                                    
                    });
                    skill_metric.belongsTo(models.expertise, {
                        foreignKey: {
                            name:'expertise_id', 
                            allowNull: false
                        }                                    
                    });
                    skill_metric.belongsTo(models.experience, {
                        foreignKey: {
                            name:'experience_id', 
                            allowNull: false
                        }                                    
                    });
                    skill_metric.belongsTo(models.user, {
                        foreignKey: {
                            name:'user_id', 
                            allowNull: false
                        }                                    
                    });
            }
        }
    });    
    return skill_metric;
}



