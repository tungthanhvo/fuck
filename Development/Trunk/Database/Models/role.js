var config = require('./config');
sequelize = config.sequelize;
Sequelize = config.Sequelize;
var role = sequelize.define('role', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(20)
  }
},{
  timestamps: false,
  freezeTableName: true}
);
module.exports = role;
