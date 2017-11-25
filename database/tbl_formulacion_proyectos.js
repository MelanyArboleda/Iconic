const Sequelize = require('sequelize');
const sequelize = require('./config');
const crud = require('.././services/crudService');
const tbl_ptds = require('./tbl_ptds');
const tbl_actores = require('./tbl_actores');

var tbl_formulacion_proyectos = sequelize.define('tbl_formulacion_proyectos', {
    nombre_articulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tblActoreId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tema_ppal: {
        type: Sequelize.STRING,
        allowNull: false
    },
    horas_semestrales: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tblPtdId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

tbl_ptds.tbl_ptds.hasMany(tbl_formulacion_proyectos);
tbl_formulacion_proyectos.belongsTo(tbl_ptds.tbl_ptds);
tbl_actores.hasMany(tbl_formulacion_proyectos);
tbl_formulacion_proyectos.belongsTo(tbl_actores);

module.exports = {
    tbl_formulacion_proyectos: tbl_formulacion_proyectos,

    buscar_FP: function (req, res, next) {
        tbl_formulacion_proyectos.sync().then(function () {
            crud.findAll(tbl_formulacion_proyectos, { tblPtdId: req.body.ptd }, 'id ASC', (resp) => {
                res.status(200).json({ apartado: resp }).end();
            });
        });
    },

    guardar_FP: function (req, res, next) {
        tbl_formulacion_proyectos.sync().then(function () {
            crud.create(tbl_formulacion_proyectos, req.body, (resp) => {
                if (resp != 'error') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    modificar_FP: function (req, res, next) {
        tbl_formulacion_proyectos.sync().then(function () {
            crud.update(tbl_formulacion_proyectos, { id: req.body.donde }, req.body.datos, (resp) => {
                if (resp == 'update') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    eliminar_FP: function (req, res, next) {
        tbl_formulacion_proyectos.sync().then(function () {
            crud.delete(tbl_formulacion_proyectos, { id: req.body.id }, (resp) => {
                if (resp == 'delete') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    }

};