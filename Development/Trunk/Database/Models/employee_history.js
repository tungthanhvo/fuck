var config = require('./config');
sequelize = config.sequelize;
Sequelize = config.Sequelize;
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
},{
  timestamps: false,
  freezeTableName: true});
module.exports = employee_history;