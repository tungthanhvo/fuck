module.exports = function(sequelize, DataTypes){ 
    var project_history = sequelize.define('project_history',{
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        role_title: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        is_included: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        underscored: true,
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                project_history.belongsTo(models.user, {
                    foreignKey: {
                        name: 'user_id',
                        allowNull: false
                    }
                });
            }
        }
    });
    return project_history;
};

