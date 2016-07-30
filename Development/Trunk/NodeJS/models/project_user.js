module.exports = function (sequelize, DataTypes) {
    var project_user = sequelize.define('project_user', {
        approver: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        my_responsibility: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        comment: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        submitted_on: {
            type: DataTypes.DATE,
            allowNull: true
        },
        join_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        release_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        is_included: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
            underscored: true,
            freezeTableName: true,
            collate: 'utf8_general_ci',
            classMethods: {
                associate: function (models) {
                    project_user.belongsTo(models.user, {
                        foreignKey: {
                            name: 'user_id',
                            allowNull: true
                        }
                    });
                    project_user.belongsTo(models.project, {
                        foreignKey: {
                            name: 'project_id',
                            allowNull: false
                        }
                    });
                    project_user.belongsTo(models.project_role, {
                        foreignKey: {
                            name: 'project_role_id',
                            allowNull: true
                        }
                    });
                    project_user.belongsTo(models.approval_status, {
                        foreignKey: {
                            name: 'approval_status_id',
                            allowNull: true
                        }
                    });
                }
            }
        });
    return project_user;
};

