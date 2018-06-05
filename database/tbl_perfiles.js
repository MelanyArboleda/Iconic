var Sequelize = require('sequelize');
var sequelize = require('./config');

// modelos de los perfiles de los usuarios
var tbl_perfiles = sequelize.define('tbl_perfiles', {
    perfil: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    }
});

module.exports = tbl_perfiles;