var Sequelize = require('sequelize');
var sequelize = require('./config');

var tbl_estados = sequelize.define('tbl_estados', {
    estado: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true
    }
});

module.exports = tbl_estados;