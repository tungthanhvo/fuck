module.exports = function(sequelize, DataTypes) {
    var employee_history = sequelize.define('employee_history', {
        from_year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        to_year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        company_name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        position: DataTypes.TEXT
    }, {
        underscored: true,
        collate: 'utf8_general_ci',
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                employee_history.belongsTo(models.user, {
                    foreignKey: {
                        name: 'user_id',
                        allowNull: false
                    }
                });
            }
        }
    });
    return employee_history;
}