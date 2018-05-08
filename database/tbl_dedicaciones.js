const Sequelize = require('sequelize');
const sequelize = require('./config');

// modelo de didicaciones
var tbl_dedicaciones = sequelize.define('tbl_dedicaciones', {
    dedicacion: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
    }
});

module.exports = tbl_dedicaciones;