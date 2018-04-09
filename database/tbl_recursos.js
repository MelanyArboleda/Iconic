var Sequelize = require('sequelize');
var sequelize = require('./config');

var tbl_recursos = sequelize.define('tbl_recursos', {
    recurso: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    }
});

module.exports = tbl_recursos;