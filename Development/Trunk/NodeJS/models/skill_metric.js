var validate_service = require('../services/validateService');

module.exports = function(sequelize, DataTypes) {
    var skill_metric = sequelize.define('skill_metric', {
        last_year_used: {
            type: DataTypes.INTEGER,
            allowNull: false
                /*validate: {
                    isInt: {
                        msg: "Invalid."
                    },
                    fn: function(last_year_used) {
                        var validate_skill_metric = new validate_service();
                        var under_year = 1950;
                        var datenow = new Date();
                        var curr_year = datenow.getFullYear();

                        if (last_year_used < 1950 && last_year_used > curr_year) {
                            throw new Error("Invalid.");
                        }
                        var user_id = this.getDataValue('user_id');
                        validate_skill_metric.validateDateOfBirthSkillMetric(user_id, last_year_used, function(res) {
                            if (!res) {
                                throw new Error("Invalid.");
                            }
                        })
                    }
                }*/
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        verified_user_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        verified_day: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        underscored: true,
        collate: 'utf8_general_ci',
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                skill_metric.belongsTo(models.skill, {
                    foreignKey: {
                        name: 'skill_id',
                        allowNull: false
                    }
                });
                skill_metric.belongsTo(models.expertise, {
                    foreignKey: {
                        name: 'expertise_id',
                        allowNull: false,

                    }
                });
                skill_metric.belongsTo(models.experience, {
                    foreignKey: {
                        name: 'experience_id',
                        allowNull: false
                    }
                });
                skill_metric.belongsTo(models.user, {
                    foreignKey: {
                        name: 'user_id',
                        allowNull: false

                    }
                });
            }
        }
    });
    return skill_metric;
}