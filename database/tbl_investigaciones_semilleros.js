const Sequelize = require('sequelize');
const sequelize = require('./config');
const crud = require('.././services/crudService');
const tbl_ptds = require('./tbl_ptds');
const tbl_vinculos = require('./tbl_vinculos');

// modelo de las investigaciones de los semilleros
var tbl_investigaciones_semilleros = sequelize.define('tbl_investigaciones_semilleros', {
    nombre_semillero: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    tblVinculoId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    actividad_desarrollada: {
        type: Sequelize.STRING,
        allowNull: false
    },
    producto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    horas_semanales: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    aprobado: {
        type: Sequelize.BOOLEAN
    },
    tblPtdId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

tbl_ptds.tbl_ptds.hasMany(tbl_investigaciones_semilleros);
tbl_investigaciones_semilleros.belongsTo(tbl_ptds.tbl_ptds);
tbl_vinculos.tbl_vinculos.hasMany(tbl_investigaciones_semilleros);
tbl_investigaciones_semilleros.belongsTo(tbl_vinculos.tbl_vinculos);

module.exports = {
    tbl_investigaciones_semilleros: tbl_investigaciones_semilleros,

    // buscador de las investigaciones de los semilleros
    buscar_IS: function (req, res, next) {
        tbl_investigaciones_semilleros.sync().then(function () {
            crud.findAll(tbl_investigaciones_semilleros, { tblPtdId: req.body.ptd }, 'id ASC', (resp) => {
                res.status(200).json({ apartado: resp }).end();
            });
        });
    },

    // guardador de las investigaciones de los semilleros
    guardar_IS: function (req, res, next) {
        tbl_investigaciones_semilleros.sync().then(function () {
            crud.create(tbl_investigaciones_semilleros, req.body, (resp) => {
                if (resp != 'error') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    // modificador de las investigaciones de los semilleros
    modificar_IS: function (req, res, next) {
        tbl_investigaciones_semilleros.sync().then(function () {
            crud.update(tbl_investigaciones_semilleros, { id: req.body.donde }, req.body.datos, (resp) => {
                if (resp == 'update') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    // eliminador de las investigaciones de los semilleros
    eliminar_IS: function (req, res, next) {
        tbl_investigaciones_semilleros.sync().then(function () {
            crud.delete(tbl_investigaciones_semilleros, { id: req.body.id }, (resp) => {
                if (resp == 'delete') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    }

};