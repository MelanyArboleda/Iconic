const Sequelize = require('sequelize');
const sequelize = require('./config');
const crud = require('.././services/crudService');
const tbl_ptds = require('./tbl_ptds');
const tbl_vinculos = require('./tbl_vinculos');

var tbl_investigaciones_proyectos = sequelize.define('tbl_investigaciones_proyectos', {
    nombre_proyecto: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    tblVinculoId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    objetivo_principal: {
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

tbl_ptds.tbl_ptds.hasMany(tbl_investigaciones_proyectos);
tbl_investigaciones_proyectos.belongsTo(tbl_ptds.tbl_ptds);
tbl_vinculos.tbl_vinculos.hasMany(tbl_investigaciones_proyectos);
tbl_investigaciones_proyectos.belongsTo(tbl_vinculos.tbl_vinculos);

module.exports = {
    tbl_investigaciones_proyectos: tbl_investigaciones_proyectos,

    buscar_IP: function (req, res, next) {
        tbl_investigaciones_proyectos.sync().then(function () {
            crud.findAll(tbl_investigaciones_proyectos, { tblPtdId: req.body.ptd }, 'id ASC', (resp) => {
                res.status(200).json({ apartado: resp }).end();
            });
        });
    },

    guardar_IP: function (req, res, next) {
        tbl_investigaciones_proyectos.sync().then(function () {
            crud.create(tbl_investigaciones_proyectos, req.body, (resp) => {
                if (resp != 'error') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    modificar_IP: function (req, res, next) {
        tbl_investigaciones_proyectos.sync().then(function () {
            crud.update(tbl_investigaciones_proyectos, { id: req.body.donde }, req.body.datos, (resp) => {
                if (resp == 'update') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    eliminar_IP: function (req, res, next) {
        tbl_investigaciones_proyectos.sync().then(function () {
            crud.delete(tbl_investigaciones_proyectos, { id: req.body.id }, (resp) => {
                if (resp == 'delete') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    }

};