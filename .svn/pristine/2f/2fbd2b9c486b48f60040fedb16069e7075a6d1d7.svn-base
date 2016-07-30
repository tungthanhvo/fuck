module.exports = function (sequelize, DataTypes) {
    var project_user = sequelize.define('project_user', {
        approval_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        approver: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: true
        }
    }, {
            underscored: true,
            freezeTableName: true,
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
                }
            }
        });
    return project_user;
};

