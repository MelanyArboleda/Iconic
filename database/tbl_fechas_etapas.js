var Sequelize = require('sequelize');
var sequelize = require('./config');
var tbl_etapas = require('./tbl_etapas');
var tbl_facultades = require('./tbl_facultades');

var tbl_fechas_etapas = sequelize.define('tbl_fechas_etapas', {
    tblEtapaId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    tblFacultadeId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    semestre: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    año: {
        type: Sequelize.DATE,
        primaryKey: true,
        allowNull: false
    },
    fecha_inicial: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fecha_final: {
        type: Sequelize.DATE,
        allowNull: false
    },

});

tbl_etapas.hasMany(tbl_fechas_etapas);
tbl_fechas_etapas.belongsTo(tbl_etapas);
tbl_facultades.hasMany(tbl_fechas_etapas);
tbl_fechas_etapas.belongsTo(tbl_facultades);

module.exports = tbl_fechas_etapas;