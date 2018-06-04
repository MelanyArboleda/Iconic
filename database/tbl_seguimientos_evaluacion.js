const Sequelize = require('sequelize');
const sequelize = require('./config');
const crud = require('.././services/crudService');
const tbl_ptds = require('./tbl_ptds');
const tbl_usuarios = require('./tbl_usuarios');
const bcrypt = require('bcryptjs');

// modelo de lo seguimientos y evaluaciones
var tbl_seguimientos_evaluacion = sequelize.define('tbl_seguimientos_evaluacion', {
    semana: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fecha: {
        type: Sequelize.DATE,
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

tbl_ptds.tbl_ptds.hasMany(tbl_seguimientos_evaluacion);
tbl_seguimientos_evaluacion.belongsTo(tbl_ptds.tbl_ptds);

module.exports = {
    tbl_seguimientos_evaluacion: tbl_seguimientos_evaluacion,

    crear_SE: function (req, res, next) {
        tbl_seguimientos_evaluacion.sync().then(function () {
            crud.findOrCreate(tbl_seguimientos_evaluacion, req.body, { tblPtdId: req.body.tblPtdId, semana: req.body.semana }, null, (resp) => {
                if (resp != 'error') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    buscar_SE: function (req, res, next) {
        tbl_seguimientos_evaluacion.sync().then(function () {
            crud.findAll(tbl_seguimientos_evaluacion, { tblPtdId: req.body.tblPtdId, semana: req.body.semana }, null, (resp) => {
                if (resp[0] == undefined) {
                    res.status(200).json({ apartado: 0 }).end();
                } else {
                    res.status(200).json({ apartado: resp[0].dataValues }).end();
                }
            });
        });
    },

    guardar_SE: function (req, res, next) {
        tbl_seguimientos_evaluacion.sync().then(function () {
            crud.update(tbl_seguimientos_evaluacion, { id: req.body.donde }, { descripcion: req.body.datos }, (resp) => {
                if (resp == 'update') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    guardar_Firma_SE: function (req, res, next) {
        tbl_seguimientos_evaluacion.sync().then(function () {
            crud.findOne(tbl_usuarios, { doc_identidad: req.body.user }, null, (user) => {
                if (bcrypt.compareSync(req.body.datos.firma_coord_prog, user.contraseña_firma)) {
                    crud.update(tbl_seguimientos_evaluacion, { id: req.body.donde }, { firma_coord_prog: true }, (resp) => {
                        if (resp == 'update') {
                            res.status(200).end();
                        } else {
                            res.sendStatus(403);
                        }
                    });
                } else {
                    if (bcrypt.compareSync(req.body.datos.firma_docente, user.contraseña_firma)) {
                        crud.update(tbl_seguimientos_evaluacion, { id: req.body.donde }, { firma_docente: true }, (resp) => {
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
            });
        });
    }
};