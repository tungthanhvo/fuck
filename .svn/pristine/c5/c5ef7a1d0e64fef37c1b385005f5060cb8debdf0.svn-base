var sequelize = require('sequelize');

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
});
skill.hasMany(skill_metric, {as: 'skill'});