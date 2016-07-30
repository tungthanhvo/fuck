var sequelize = require('sequelize');
var employee_history = sequelize.define('employee_history', {

  from_date: {
    type: Sequelize.DATE
  },
  to_date: {
    type: Sequelize.DATE
  },
  company_name: {
    type: Sequelize.TEXT
  },
  position: {
    type: Sequelize.TEXT
  }
});
course.belongsTo(user);