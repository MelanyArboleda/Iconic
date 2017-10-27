var Sequelize = require('sequelize');
var sequelize = require('./config');
var tbl_estados = require('./tbl_estados');
var tbl_dedicaciones = require('./tbl_dedicaciones');
var tbl_perfiles = require('./tbl_perfiles');

var tbl_usuarios = sequelize.define('tbl_usuarios', {
    doc_identidad: {
        type: Sequelize.STRING(15),
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    apellido_1: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    apellido_2: {
        type: Sequelize.STRING(50),
    },
    correo: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    contraseña: {
        type: Sequelize.STRING(250),
        allowNull: false
    },
    contraseña_firma: {
        type: Sequelize.STRING(250),
        allowNull: false
    },
    tblDedicacioneId: {
        type: Sequelize.INTEGER
    },
    firma: {
        type: Sequelize.BLOB,
        //allowNull: false
    },
    tblPerfileId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tblEstadoId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    recuperar: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

tbl_estados.hasMany(tbl_usuarios);
tbl_usuarios.belongsTo(tbl_estados);
tbl_dedicaciones.hasMany(tbl_usuarios);
tbl_usuarios.belongsTo(tbl_dedicaciones);
tbl_perfiles.hasMany(tbl_usuarios);
tbl_usuarios.belongsTo(tbl_perfiles);

module.exports = tbl_usuarios;