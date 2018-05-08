const Sequelize = require('sequelize');
const sequelize = require('./config');
const crud = require('.././services/crudService');
const tbl_ptds = require('./tbl_ptds');
const tbl_usuarios = require('.././database/tbl_usuarios');
const bcrypt = require('bcryptjs');

// modelo de las observaciones de los planes de trabajo en el apartado otras actividades
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

    // buscador de observaciones del plan de trabajo
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

    // creador de observaciones del plan de trabajo
    crear_Observaciones: function (req, res, next) {
        tbl_observaciones.sync().then(function () {
            crud.findOrCreate(tbl_observaciones, req.body, { tblPtdId: req.body.tblPtdId }, null, (resp) => {
                if (resp != 'error') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    //guardador de observaciones del plan de trabajo
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
    },

    // guardador de firmas en este apartado
    guardar_Firma_Observaciones: function (req, res, next) {
        tbl_observaciones.sync().then(function () {
            crud.findOne(tbl_usuarios, { doc_identidad: req.body.user }, null, (user) => {
                if (bcrypt.compareSync(req.body.datos.firma_consejo_facultad, user.contraseña_firma)) {
                    crud.update(tbl_observaciones, { id: req.body.donde }, { firma_consejo_facultad: true }, (resp) => {
                        if (resp == 'update') {
                            res.status(200).end();
                        } else {
                            res.sendStatus(403);
                        }
                    });
                } else {
                    if (bcrypt.compareSync(req.body.datos.firma_coord_prog, user.contraseña_firma)) {
                        crud.update(tbl_observaciones, { id: req.body.donde }, { firma_coord_prog: true }, (resp) => {
                            if (resp == 'update') {
                                res.status(200).end();
                            } else {
                                res.sendStatus(403);
                            }
                        });
                    } else {
                        if (bcrypt.compareSync(req.body.datos.firma_docente, user.contraseña_firma)) {
                            crud.update(tbl_observaciones, { id: req.body.donde }, { firma_docente: true }, (resp) => {
                                if (resp == 'update') {
                                    res.status(200).end();
                                } else {
                                    res.sendStatus(403);
                                }
                            });
                        } else {
                            res.sendStatus(401);
                        }
                    }
                }
            });
        });
    }
};