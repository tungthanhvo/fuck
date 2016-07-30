var config = require('./config');
sequelize = config.sequelize;
Sequelize = config.Sequelize;
var competence = sequelize.define('competence', {
  name: {
    type: Sequelize.STRING(100)
  }
},{
  timestamps: false,
  freezeTableName: true});
module.exports = competence;
