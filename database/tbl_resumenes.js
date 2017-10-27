const Sequelize = require('sequelize');
const sequelize = require('./config');
const crud = require('.././services/crudService');
const tbl_ptds = require('./tbl_ptds');

var tbl_resumenes = sequelize.define('tbl_resumenes', {
    horas_semanales_tot: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    horas_semestrales_tot: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    observaciones: {
        type: Sequelize.STRING
    },
    tblPtdId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

tbl_ptds.tbl_ptds.hasMany(tbl_resumenes);
tbl_resumenes.belongsTo(tbl_ptds.tbl_ptds);

module.exports = {
    tbl_resumenes: tbl_resumenes,

    buscar_RG: function (req, res, next) {
        tbl_resumenes.sync().then(function () {
            crud.findAll(tbl_resumenes, { tblPtdId: req.body.ptd }, null, (resp) => {
                if (resp[0] == undefined) {
                    res.status(200).json({ apartado: 0 }).end();
                } else {
                    res.status(200).json({ apartado: resp[0].dataValues }).end();
                }
            });
        });
    },

    guardar_RG: function (req, res, next) {
        tbl_resumenes.sync().then(function () {
            crud.create(tbl_resumenes, req.body.datos, (resp) => {
                if (resp != 'error') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    modificar_RG: function (req, res, next) {
        tbl_resumenes.sync().then(function () {
            crud.update(tbl_resumenes, { id: req.body.datos.id }, req.body.datos, (resp) => {
                if (resp == 'update') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    eliminar_RG: function (req, res, next) {
        tbl_resumenes.sync().then(function () {
            crud.delete(tbl_resumenes, { id: req.body.datos.id }, (resp) => {
                if (resp == 'delete') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    }

};