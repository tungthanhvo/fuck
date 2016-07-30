var Sequelize = require('sequelize');

var sequelize = new Sequelize('test','root', '12345678',{
    host: 'localhost',
    port: 3306,
    pool:{
        max:5,
        min: 0,
        idle:1000
    }
});

module.exports.sequelize  = sequelize;
module.exports.Sequelize  = Sequelize;
