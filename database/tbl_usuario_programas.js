const Sequelize = require('sequelize');
const sequelize = require('./config');
const tbl_usuarios = require('./tbl_usuarios');
const tbl_programas = require('./tbl_programas');

var tbl_usuario_programas = sequelize.define('tbl_usuario_programas', {
    tblUsuarioDocIdentidad: {
        type: Sequelize.STRING(15),
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
        primaryKey: true,
        allowNull: false
    },
    tblProgramaSede: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    }
});

tbl_usuarios.hasMany(tbl_usuario_programas);
tbl_usuario_programas.belongsTo(tbl_usuarios);
tbl_programas.hasMany(tbl_usuario_programas);
tbl_usuario_programas.belongsTo(tbl_programas);

module.exports = tbl_usuario_programas;