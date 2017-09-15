var Sequelize = require('sequelize');
var sequelize = require('./config');

var tbl_dias = sequelize.define('tbl_dias', {
    dia: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true
    }
});

module.exports = tbl_dias;