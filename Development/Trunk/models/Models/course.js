module.exports = function(sequelize, DataTypes){    
    var course = sequelize.define('course', {
        from_date: {
            type :DataTypes.INTEGER,
            allowNull: false
        },
        to_date: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        course_name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        course_desciption: DataTypes.TEXT,
        achievement: DataTypes.TEXT
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                course.belongsTo(models.user, {
                    foreignKey: {
                        name: 'user_id',
                        allowNull: false
                    }
                });
            }
        }
    });  
    return course;
}


