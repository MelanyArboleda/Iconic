var Sequelize = require('sequelize');
var sequelize = require('./config');

// modelo de las facultades
var tbl_facultades = sequelize.define('tbl_facultades', {
    facultad: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    }
});

module.exports = tbl_facultades;