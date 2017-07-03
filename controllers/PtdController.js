const funciones = require('.././services/funciones');
const crud = require('.././services/crudService');
const modelo = require('.././database/modelos');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const mail = require('./MailController');
module.exports = {

    creacion: function (req, res, next) {
        crud.findOne(modelo.tbl_usuario_programa, { tblUsuarioDocIdentidad: req.body.doc_identidad }, null, (programa) => {
            console.log(programa);
            crud.innerFacultad([modelo.tbl_facultades, modelo.tbl_areas, modelo.tbl_programas], { codigo: programa.tblProgramaCodigo }, (facultad) => {
                console.log(facultad);
                crud.findOne(modelo.tbl_fechas_etapas, { tblFacultadeId: facultad.id }, 'año desc', (fechas) => {
                    console.log(fechas);
                    var datos = {
                        tblUsuarioDocIdentidad: req.body.doc_identidad,
                        fecha: fechas.año,
                        semestre: fechas.semestre,
                        version: 1,
                        horas_semanales: 0
                    }
                    modelo.tbl_ptds.sync().then(function () {
                        crud.findOrCreate(modelo.tbl_ptds, datos, { tblUsuarioDocIdentidad: datos.tblUsuarioDocIdentidad }, (ptd, resp) => {
                            if (resp) {
                                res.status(200).json({ ptd: ptd, mensaje: 'ptd' }).end();
                            } else {
                                res.status(200).json({ ptd: ptd, mensaje: 'ptd' }).end();
                            }

                        });
                    });
                });
            });
        });
    },

    apartado: function (req, res, next) {
        funciones.buscarTabla(req.body.tabla, function (tabla) {
            tabla.sync().then(function () {
                if (req.body.tabla == 'tbl_ptds' || req.body.tabla == 'tbl_resumenes') {
                    crud.findAll(tabla, { id: req.body.ptd }, null, (resp) => {
                        res.status(200).json({ apartado: resp[0].dataValues }).end();
                    });
                } else {
                    crud.findAll(tabla, { tblPtdId: req.body.ptd }, 'id ASC', (resp) => {
                        res.status(200).json({ apartado: resp }).end();
                    });
                }
            });
        });
    },

    save: function (req, res, next) {
        funciones.buscarTabla(req.body.tabla, function (tabla) {
            tabla.sync().then(function () {
                if (req.body.datos.id == undefined) {
                    req.body.datos.id = null;
                    crud.create(tabla, req.body.datos, (resp) => {
                        if (resp != 'error') {
                            res.status(200).end();
                        } else {
                            res.sendStatus(403);
                        }
                    });
                } else {
                    crud.update(tabla, { id: req.body.datos.id }, req.body.datos, (resp) => {
                        if (resp == 'update') {
                            res.status(200).end();
                        } else {
                            res.sendStatus(403);
                        }
                    });
                }
            });
        });
    }
};