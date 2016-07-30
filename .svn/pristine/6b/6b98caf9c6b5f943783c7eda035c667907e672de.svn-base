module.exports = function(sequelize, DataTypes) {
    var education = sequelize.define('education', {
        from_year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: "Must be a year"
                },
                fn: function(fromyear) {
                    var under_year = 1950;
                    var datenow = new Date();
                    var curr_year = datenow.getFullYear();
                    if (fromyear > curr_year || fromyear < under_year) throw new Error("Year is unvalid.");
                }
            }
        },
        to_year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: "Must be a year"
                },
                fn: function(toyear) {
                    var under_year = 1950;
                    var datenow = new Date();
                    var curr_year = datenow.getFullYear();
                    var from_date = this.getDataValue('from_year');
                    if (toyear > curr_year || toyear < under_year) throw new Error("Year is unvalid.");
                    if (from_date >= toyear) throw new Error("To_Year is greater than From_Year.");
                }
            }
        },
        university_college_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                fn: function(str) {
                    if (str.length > 255) throw new Error("Max length 255 characters.");
                    if (!str.length) throw new Error("Min length 1 character.")
                }
            }
        },
        major: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                fn: function(str) {
                    if (str.length > 255) throw new Error("Max length 255 characters.");
                    if (!str.length) throw new Error("Min length 1 character.")
                }
            }
        }
    }, {
        underscored: true,
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                education
                    .belongsTo(models.user, {
                        foreignKey: {
                            name: 'user_id',
                            allowNull: false
                        }
                    });
            }
        }
    });
    return education;
};