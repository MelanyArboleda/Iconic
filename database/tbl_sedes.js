var Sequelize = require('sequelize');
var sequelize = require('./config');

// modelo de las sedes
var tbl_sedes = sequelize.define('tbl_sedes', {
    sede: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
    }
});

module.exports = tbl_sedes;