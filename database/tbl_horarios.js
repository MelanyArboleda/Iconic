var Sequelize = require('sequelize');
var sequelize = require('./config');
var tbl_observaciones = require('./tbl_observaciones');

var tbl_horarios = sequelize.define('tbl_horarios', {
    dia: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    hora_inicio: {
        type: Sequelize.DATE,
        allowNull: false
    },
    hora_fin: {
        type: Sequelize.DATE,
        allowNull: false
    },
    tblObservacioneId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

tbl_observaciones.tbl_observaciones.hasMany(tbl_horarios);
tbl_horarios.belongsTo(tbl_observaciones.tbl_observaciones);

module.exports = {
    tbl_horarios: tbl_horarios,
};