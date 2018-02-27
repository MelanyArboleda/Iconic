const Sequelize = require('sequelize');
const sequelize = require('./config');
const crud = require('.././services/crudService');
const tbl_ptds = require('./tbl_ptds');

var tbl_observaciones = sequelize.define('tbl_observaciones', {
    observacion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firma_consejo_facultad: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    firma_coord_prog: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    firma_docente: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    tblPtdId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

tbl_ptds.tbl_ptds.hasMany(tbl_observaciones);
tbl_observaciones.belongsTo(tbl_ptds.tbl_ptds);

module.exports = {
    tbl_observaciones: tbl_observaciones,

    buscar_Observaciones: function (req, res, next) {
        tbl_observaciones.sync().then(function () {
            crud.findAll(tbl_observaciones, { tblPtdId: req.body.tblPtdId }, null, (resp) => {
                if (resp[0] == undefined) {
                    res.status(200).json({ apartado: 0 }).end();
                } else {
                    res.status(200).json({ apartado: resp[0].dataValues }).end();
                }
            });
        });
    },

    crear_Observaciones: function (req, res, next) {
        tbl_observaciones.sync().then(function () {
            crud.findOrCreate(tbl_observaciones, req.body, req.body.id,null, (resp) => {
                if (resp != 'error') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    guardar_Observaciones: function (req, res, next) {
        tbl_observaciones.sync().then(function () {
            crud.update(tbl_observaciones, { id: req.body.donde }, req.body.datos, (resp) => {
                if (resp == 'update') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    }
};