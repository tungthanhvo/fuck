module.exports = function(sequelize, DataTypes) {
    var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    var user = sequelize.define('user', {
        staff_code: {
            type: DataTypes.STRING(20),
            unique: true,
            validate: {
                fn: function(str) {
                    str = str.trim();
                    var dept_codes;
                    sequelize.query('SELECT code FROM department', {
                        type: models.Sequelize.QueryTypes.SELECT
                    }).then(function(data) {
                        dept_codes = data;
                    }).catch(function(err) {
                        throw new Error('Problem querying database');
                    });
                    var containDeptCode = false;
                    for (var i = 0; i < dept_codes.length; i++) {
                        if (str.indexOf(dept_codes[i]) == 0) {
                            containDeptCode = true;
                            break;
                        }
                    }
                    if (!containDeptCode) throw new Error("Invalid Staff Code");
                }
            },
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: false
        },
        gender: {
            type: DataTypes.INTEGER,
            validate: {
                fn: function(val) {
                    if (val != 0 && val != 1) {
                        throw new Error("Invalid gender code (must be 0 or 1)");
                    }
                }
            },
            allowNull: false
        },
        married_status: {
            type: DataTypes.INTEGER,
            validate: {
                fn: function(val) {
                    if (val != 0 && val != 1) {
                        throw new Error("Invalid marital status code (must be 0 or 1)");
                    }
                }
            },
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        country_code: {
            type: DataTypes.STRING(50),
            validate: {
                fn: function(countryCode) {
                    countryCode = countryCode.trim();
                    //TODO: fetch JSON
                }
            },
            allowNull: false
        },
        nationality_code: {
            type: DataTypes.STRING(50),
            validate: {
                fn: function(nationalityCode) {
                    nationalityCode = nationalityCode.trim();
                    //TODO: fetch JSON
                }
            },
            allowNull: false
        },
        ext: {
            type: DataTypes.TEXT
        },
        mobile: {
            type: DataTypes.STRING(30),
            validate: {
                fn: function(num) {
                    num = num.trim();
                    if (num.length != 0 && !/^[0-9+() -]+$/.test(num)) {
                        throw new Error("Invalid mobile phone format");
                    }
                }
            },
        },
        personal_email: {
            type: DataTypes.STRING(100),
            validate: {
                fn: function(email) {
                    email = email.trim();
                    if (email.length != 0 && !emailRegex.test(email)) {
                        throw new Error("Invalid email format");
                    }
                }
            }
        },
        personal_quote: {
            type: DataTypes.STRING(1000)
        },
        hobby: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        personal_statement: {
            type: DataTypes.STRING(1000)
        },
        avatar: {
            type: DataTypes.STRING(1000)
        },
        nickname: {
            type: DataTypes.STRING(50)
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        hash_password: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        company_email: {
            type: DataTypes.STRING(100),
            validate: {
                fn: function(email) {
                    email = email.trim();
                    if (!emailRegex.test(email)) {
                        throw new Error("Invalid email format");
                    }
                }
            },
            allowNull: false
        },
        company_join_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        level: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        line_manager_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        underscored: true,
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                user.hasMany(models.course, {
                    foreignKey: {
                        name: 'user_id',
                        allowNull: false
                    }
                });
                user.hasMany(models.skill_metric, {
                    foreignKey: {
                        name: 'user_id',
                        allowNull: false
                    }
                });
                user.hasMany(models.employee_history, {
                    foreignKey: {
                        name: 'user_id',
                        allowNull: false
                    }
                });
                user.hasMany(models.education, {
                    foreignKey: {
                        name: 'user_id',
                        allowNull: true
                    }
                });
                user.belongsTo(models.role, {
                    foreignKey: {
                        name: 'role_id',
                        allowNull: false
                    }
                });
                user.hasMany(models.user_technical_skill, {
                    foreignKey: {
                        name: 'user_id',
                        allowNull: false
                    }
                });
                user.belongsTo(models.competence_job_title, {
                    foreignKey: {
                        name: 'competence_job_title_id',
                        allowNull: false
                    }
                });
            }
        }
    });
    return user;
};