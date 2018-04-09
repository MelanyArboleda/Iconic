var Sequelize = require('sequelize');
var sequelize = require('./config');

var tbl_perfiles = sequelize.define('tbl_perfiles', {
    perfil: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    }
});

module.exports = tbl_perfiles;