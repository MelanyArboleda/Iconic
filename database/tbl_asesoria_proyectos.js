const Sequelize = require('sequelize');
const sequelize = require('./config');
const crud = require('.././services/crudService');
const tbl_ptds = require('./tbl_ptds');

var tbl_asesoria_proyectos = sequelize.define('tbl_asesoria_proyectos', {
    integrantes: {
        type: Sequelize.STRING,
        allowNull: false
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    aspectos: {
        type: Sequelize.STRING,
        allowNull: false
    },
    horas_semestrales: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    estudiante: {
        type: Sequelize.INTEGER
    },
    jefe: {
        type: Sequelize.INTEGER
    },
    tblPtdId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

tbl_ptds.tbl_ptds.hasMany(tbl_asesoria_proyectos);
tbl_asesoria_proyectos.belongsTo(tbl_ptds.tbl_ptds);

module.exports = {
    tbl_asesoria_proyectos: tbl_asesoria_proyectos,

    buscar_AP: function (req, res, next) {
        tbl_asesoria_proyectos.sync().then(function () {
            crud.findAll(tbl_asesoria_proyectos, { tblPtdId: req.body.ptd }, 'id ASC', (resp) => {
                res.status(200).json({ apartado: resp }).end();
            });
        });
    },


    guardar_AP: function (req, res, next) {
        tbl_asesoria_proyectos.sync().then(function () {
            crud.create(tbl_asesoria_proyectos, req.body, (resp) => {
                if (resp != 'error') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    modificar_AP: function (req, res, next) {
        tbl_asesoria_proyectos.sync().then(function () {
            crud.update(tbl_asesoria_proyectos, { id: req.body.donde }, req.body.datos, (resp) => {
                if (resp == 'update') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    eliminar_AP: function (req, res, next) {
        tbl_asesoria_proyectos.sync().then(function () {
            crud.delete(tbl_asesoria_proyectos, { id: req.body.id }, (resp) => {
                if (resp == 'delete') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

};