var Sequelize = require('sequelize');
var sequelize = require('./config');
var tbl_areas = require('./tbl_areas');
var tbl_sedes = require('./tbl_sedes');

var tbl_programas = sequelize.define('tbl_programas', {
    codigo: {
        type: Sequelize.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    tblSedeId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    programa: {
        type: Sequelize.STRING(100),
        primaryKey: true,
        allowNull: false
    },
    tblAreaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

tbl_areas.hasMany(tbl_programas);
tbl_programas.belongsTo(tbl_areas);
tbl_sedes.hasMany(tbl_programas);
tbl_programas.belongsTo(tbl_sedes);

module.exports = tbl_programas;