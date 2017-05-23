var Sequelize = require('sequelize');
var sequelize = new Sequelize('iconic', 'iconic', 'iconic', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 9,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;