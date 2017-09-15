var Sequelize = require('sequelize');
var sequelize = require('./config');

var tbl_etapas = sequelize.define('tbl_etapas', {
    etapa: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
    }
});

module.exports = tbl_etapas;