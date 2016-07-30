module.exports = function(sequelize, DataTypes) {
    var department = sequelize.define('department', {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        code: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
    }, {
        underscored: true,
        freezeTableName: true,
        collate: 'utf8_general_ci',
        classMethods: {
            associate: function(models) {
                department.hasMany(models.competence, {
                    foreignKey: {
                        name: 'department_id',
                        allowNull: false
                    }
                });
            }
        }
    });
    return department;
};