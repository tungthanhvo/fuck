var config = require('./config');
sequelize = config.sequelize;
Sequelize = config.Sequelize;
var education = sequelize.define('education',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    from_date: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            is_from_date: function(from_date) {
                //var datanow = 
            }
        }
    },
    to_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    university_college_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    major: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps: false,
  freezeTableName: true}
);


module.exports = education;