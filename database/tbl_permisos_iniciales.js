var Sequelize = require('sequelize');
var sequelize = require('./config');
var tbl_recursos = require('./tbl_recursos');
var tbl_perfiles = require('./tbl_perfiles');

var tbl_permisos_iniciales = sequelize.define('tbl_permisos_iniciales', {
    tblRecursoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    tblPerfileId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    ver: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    crear: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    modificar: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    eliminar: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

tbl_recursos.hasMany(tbl_permisos_iniciales);
tbl_permisos_iniciales.belongsTo(tbl_recursos);
tbl_perfiles.hasMany(tbl_permisos_iniciales);
tbl_permisos_iniciales.belongsTo(tbl_perfiles);

module.exports = tbl_permisos_iniciales;