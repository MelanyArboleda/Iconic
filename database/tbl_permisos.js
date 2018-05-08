var Sequelize = require('sequelize');
var sequelize = require('./config');
var tbl_recursos = require('./tbl_recursos');
var tbl_usuarios = require('./tbl_usuarios');

// modelo de los permisos de los usuarios
var tbl_permisos = sequelize.define('tbl_permisos', {
	tblRecursoId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: false
	},
	tblUsuarioDocIdentidad: {
		type: Sequelize.STRING(15),
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

tbl_recursos.hasMany(tbl_permisos);
tbl_permisos.belongsTo(tbl_recursos);
tbl_usuarios.hasMany(tbl_permisos);
tbl_permisos.belongsTo(tbl_usuarios);

module.exports = tbl_permisos;