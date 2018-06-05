var Sequelize = require('sequelize');
var sequelize = require('./config');

// modelo de los estados de los usuarios
var tbl_estados = sequelize.define('tbl_estados', {
    estado: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true
    }
});

module.exports = tbl_estados;