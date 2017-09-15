var Sequelize = require('sequelize');
var sequelize = require('./config');
var tbl_recursos = require('./tbl_recursos');
var tbl_usuarios = require('./tbl_usuarios');

var tbl_permisos = sequelize.define('tbl_permisos', {
    tblRecursoId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    tblUsuarioDoc_identidad: {
      type: Sequelize.STRING(15),
      primaryKey: true,
      allowNull: false
    },
    consultar: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    guardar: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    modificar: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  });
  
  tbl_recursos.hasMany(tbl_permisos);
  tbl_permisos.belongsTo(tbl_recursos);
  tbl_usuarios.hasMany(tbl_permisos);
  tbl_permisos.belongsTo(tbl_usuarios);

  module.exports = tbl_permisos;