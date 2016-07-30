var config = require('./config');
sequelize = config.sequelize;
Sequelize = config.Sequelize;
var job_title = sequelize.define('job_title', {
  name: {
    type: Sequelize.STRING(100)
  }
},{
  timestamps: false,
  freezeTableName: true}
);

module.exports = job_title;