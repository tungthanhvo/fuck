var config = require('./config');
sequelize = config.sequelize;
Sequelize = config.Sequelize;
var skill_metric = sequelize.define('skill_metric', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
last_year_used: {
    type: Sequelize.INTEGER
  },
  is_verified: {
    type: Sequelize.BOOLEAN
  },
  verified_userid: {
    type: Sequelize.INTEGER
  },
verified_day:{
    type: Sequelize.DATE
}
},{
  timestamps: false,
  freezeTableName: true});
module.exports = skill_metric;
