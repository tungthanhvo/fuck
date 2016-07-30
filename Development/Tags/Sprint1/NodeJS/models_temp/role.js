module.exports = function(sequelize, DataTypes){ 
    var role = sequelize.define('role',{
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        underscored: true,
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                role.hasMany(models.user, {
                    foreignKey: {
                        name: 'role_id',
                        allowNull: false
                    }
                });
            }
        }
    });
    return role;
};

