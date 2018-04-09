const Sequelize = require('sequelize');
const sequelize = require('./config');
const tbl_programas = require('./tbl_programas');
const tbl_materias = require('./tbl_materias');

var tbl_materias_programas = sequelize.define('tbl_materias_programas', {
    tblMateriaCodigo: {
        type: Sequelize.STRING(15),
        primaryKey: true,
        allowNull: false
    },
    tblMateriaNombre: {
        type: Sequelize.STRING(100),
        primaryKey: true,
        allowNull: false
    },
    tblProgramaCodigo: {
        type: Sequelize.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    tblProgramaPrograma: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    tblProgramaSede: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    }
});

tbl_materias.hasMany(tbl_materias_programas);
tbl_materias_programas.belongsTo(tbl_materias);
tbl_programas.hasMany(tbl_materias_programas);
tbl_materias_programas.belongsTo(tbl_programas);

module.exports = tbl_materias_programas;