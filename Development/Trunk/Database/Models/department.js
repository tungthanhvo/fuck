var config = require('./config');
sequelize = config.sequelize;
Sequelize = config.Sequelize;
var department = sequelize.define('department', {
  name: {
    type: Sequelize.STRING(100)
  },
  code: {
    type: Sequelize.STRING(10)
  },
  is_deleted: {
    type: Sequelize.BOOLEAN 
  }
},{
  timestamps: false,
  freezeTableName: true});
module.exports = department;
