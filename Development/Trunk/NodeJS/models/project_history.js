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
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        my_responsibility: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        technology: {
            type: DataTypes.STRING(500),
            allowNull: true
        }
    }, {
        underscored: true,
        freezeTableName: true,
        collate: 'utf8_general_ci',
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

