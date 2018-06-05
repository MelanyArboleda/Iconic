var Sequelize = require('sequelize');
var sequelize = require('./config');
var tbl_etapas = require('./tbl_etapas');
var tbl_facultades = require('./tbl_facultades');
const crud = require('.././services/crudService');

// modelo de las fechas para las etapas
var tbl_fechas_etapas = sequelize.define('tbl_fechas_etapas', {
    tblEtapaId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    tblFacultadeId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    semestre: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    ano: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    fecha_inicial: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fecha_final: {
        type: Sequelize.DATE,
        allowNull: false
    },

});

tbl_etapas.hasMany(tbl_fechas_etapas);
tbl_fechas_etapas.belongsTo(tbl_etapas);
tbl_facultades.hasMany(tbl_fechas_etapas);
tbl_fechas_etapas.belongsTo(tbl_facultades);

module.exports = {
    tbl_fechas_etapas: tbl_fechas_etapas,

    // buscador de las fechas de la estapas
    buscar_FechaEtapa: function (req, res, next) {
        tbl_fechas_etapas.sync().then(function () {
            crud.findAll(tbl_fechas_etapas, req.body, 'semestre ASC', (resp) => {
                res.status(200).json({ apartado: resp }).end();
            });
        });
    },

    // guardador de las fechas de las etapas
    guardar_FechaEtapa: function (req, res, next) {
        tbl_fechas_etapas.sync().then(function () {
            crud.create(tbl_fechas_etapas, req.body, (resp) => {
                if (resp != 'error') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    // modificador de las fechas de las etapas
    modificar_FechaEtapa: function (req, res, next) {
        tbl_fechas_etapas.sync().then(function () {
            crud.update(tbl_fechas_etapas, req.body.donde, req.body.datos, (resp) => {
                if (resp == 'update') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    // eliminador de las fechas de las etapas
    eliminar_FechaEtapa: function (req, res, next) {
        tbl_fechas_etapas.sync().then(function () {
            crud.delete(tbl_fechas_etapas, req.body, (resp) => {
                if (resp == 'delete') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    }

};