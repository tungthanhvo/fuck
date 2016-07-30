var config = require('./config');
sequelize = config.sequelize;
Sequelize = config.Sequelize;
var experience = sequelize.define('experience', {

  level: {
    type: Sequelize.DATE
  },
  desciption: {
    type: Sequelize.DATE
  }},{
    timestamps: false,
  freezeTableName: true}
);
module.exports = experience;
