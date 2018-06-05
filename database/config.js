// configuracion de la conexion con la base de datos
var Sequelize = require('sequelize');
var sequelize = new Sequelize('iconic', 'iconic', 'iconic', {
    // host: 'localhost',
    host: 'http://postgresql-iconic.a3c1.starter-us-west-1.openshiftapps.com',
    //host: '127.0.0.1',
    dialect: 'postgres',
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;