var config = require('./config');
sequelize = config.sequelize;
Sequelize = config.Sequelize;
var skill = sequelize.define('skill', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(30)
  },
  parent_id: {
    type: Sequelize.INTEGER
  },
  level: {
    type: Sequelize.INTEGER
  }
},{
  timestamps: false,
  freezeTableName: true});
module.exports = skill;
