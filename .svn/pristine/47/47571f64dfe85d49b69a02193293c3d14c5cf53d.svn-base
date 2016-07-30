module.exports = function (sequelize, DataTypes) {
    var project_role = sequelize.define('project_role', {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        is_selected: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
            underscored: true,
            freezeTableName: true,
            classMethods: {
                associate: function (models) {                    
                    project_role.hasMany(models.project_user, {
                        foreignKey: {
                            name: 'project_role_id',
                            allowNull: true
                        }
                    });
                }
            }
        });
    return project_role;
};

