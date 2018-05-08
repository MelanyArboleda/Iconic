var Sequelize = require('sequelize');
var sequelize = require('./config');
var tbl_usuarios = require('./tbl_usuarios');

// modelo de las notificaciones
var tbl_notificaciones = sequelize.define('tbl_notificaciones', {
    mensaje: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tblUsuarioDocIdentidad: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    fecha: {
        type: Sequelize.DATE,
        allowNull: false
    },
    visto: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

tbl_usuarios.hasMany(tbl_notificaciones);
tbl_notificaciones.belongsTo(tbl_usuarios);

module.exports = tbl_notificaciones;