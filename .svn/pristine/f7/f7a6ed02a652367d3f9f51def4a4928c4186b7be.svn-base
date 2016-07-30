var config = require('./config');
sequelize = config.sequelize;
Sequelize = config.Sequelize;
var course = sequelize.define('course', {

  from_date: {
    type: Sequelize.DATE
  },
  to_date: {
    type: Sequelize.DATE
  },
  course_name: {
    type: Sequelize.TEXT
  },
  course_desciption: {
    type: Sequelize.TEXT
  },
  achievement: {
    type: Sequelize.TEXT
  },
  
},{
  timestamps: false,
  freezeTableName: true}
);
module.exports = course;
//course.belongsTo(user);