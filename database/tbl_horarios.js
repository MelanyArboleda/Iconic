var Sequelize = require('sequelize');
var sequelize = require('./config');
var tbl_observaciones = require('./tbl_observaciones');
var tbl_dias = require('./tbl_dias');

var tbl_horarios = sequelize.define('tbl_horarios', {
    tblDiaId: {
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
tbl_dias.hasMany(tbl_horarios);
tbl_horarios.belongsTo(tbl_dias);

module.exports = {
    tbl_horarios: tbl_horarios,
};