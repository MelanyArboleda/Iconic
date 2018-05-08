// configuracion de la conexion con la base de datos
var Sequelize = require('sequelize');
var sequelize = new Sequelize('iconic', 'iconic', 'iconic', {
    host: 'localhost',
    //host: '127.0.0.1',
    dialect: 'postgres',
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;