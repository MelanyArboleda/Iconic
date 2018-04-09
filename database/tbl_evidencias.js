var Sequelize = require('sequelize');
var sequelize = require('./config');
var tbl_seguimientos_evaluacion = require('./tbl_seguimientos_evaluacion');

var tbl_evidencias = sequelize.define('tbl_evidencias', {
    evidencia: {
        type: Sequelize.BLOB
    },
    tblSeguimientos_evaluacionId: {
        type: Sequelize.INTEGER
    }
});

tbl_seguimientos_evaluacion.tbl_seguimientos_evaluacion.hasMany(tbl_evidencias);
tbl_evidencias.belongsTo(tbl_seguimientos_evaluacion.tbl_seguimientos_evaluacion);

module.exports = {
    tbl_evidencias: tbl_evidencias,
};