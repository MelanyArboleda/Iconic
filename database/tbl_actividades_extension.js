const Sequelize = require('sequelize');
const sequelize = require('./config');
const crud = require('.././services/crudService');
const tbl_ptds = require('./tbl_ptds');

// modelo de las actividades de extension
var tbl_actividades_extension = sequelize.define('tbl_actividades_extension', {
    nombre_actividad: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    fecha_inicio: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fecha_final: {
        type: Sequelize.DATE,
        allowNull: false
    },
    horas_semestrales: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    aprobado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    tblPtdId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

tbl_ptds.tbl_ptds.hasMany(tbl_actividades_extension);
tbl_actividades_extension.belongsTo(tbl_ptds.tbl_ptds);

module.exports = {
    tbl_actividades_extension: tbl_actividades_extension,

    // buscardor de las actividades de extension
    buscar_AE: function (req, res, next) {
        tbl_actividades_extension.sync().then(function () {
            crud.findAll(tbl_actividades_extension, { tblPtdId: req.body.ptd }, 'id ASC', (resp) => {
                res.status(200).json({ apartado: resp }).end();
            });
        });
    },

    // guardador de las actividades de extension
    guardar_AE: function (req, res, next) {
        tbl_actividades_extension.sync().then(function () {
            crud.create(tbl_actividades_extension, req.body, (resp) => {
                if (resp != 'error') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    // modificador de las actividades de extension
    modificar_AE: function (req, res, next) {
        tbl_actividades_extension.sync().then(function () {
            crud.update(tbl_actividades_extension, { id: req.body.donde }, req.body.datos, (resp) => {
                if (resp == 'update') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    // eliminador de las actividades de extension
    eliminar_AE: function (req, res, next) {
        tbl_actividades_extension.sync().then(function () {
            crud.delete(tbl_actividades_extension, { id: req.body.id }, (resp) => {
                if (resp == 'delete') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    }

};