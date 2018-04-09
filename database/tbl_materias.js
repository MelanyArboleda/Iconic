const Sequelize = require('sequelize');
const sequelize = require('./config');

var tbl_materias = sequelize.define('tbl_materias', {
    codigo: {
        type: Sequelize.STRING(15),
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING(100),
        primaryKey: true,
        allowNull: false
    },
    horas_semanales: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = tbl_materias;