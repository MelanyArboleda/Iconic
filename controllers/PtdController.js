const crud = require('.././services/crudService');
const funciones = require('.././services/funciones');
const tbl_perfiles = require('.././database/tbl_perfiles');
const tbl_usuario_programas = require('.././database/tbl_usuario_programas');
const tbl_programas = require('.././database/tbl_programas');
const tbl_areas = require('.././database/tbl_areas');
const tbl_facultades = require('.././database/tbl_facultades');
const tbl_etapas = require('.././database/tbl_etapas');
const tbl_actores = require('.././database/tbl_actores');
const tbl_permisos = require('.././database/tbl_permisos');
const tbl_permisos_iniciales = require('.././database/tbl_permisos_iniciales');
const tbl_noticaciones = require('.././database/tbl_noticaciones');

module.exports = {
    // buscador de los perfiles de los usuarios
    buscar_Perfil: function (req, res, next) {
        crud.findOne(tbl_perfiles, { id: req.body.id }, null, (perfil) => {
            res.status(200).json(perfil).end();
        });
    },

    // buscador de los programas
    buscar_Programa: function (req, res, next) {
        tbl_usuario_programas.sync().then(function () {
            crud.findOne(tbl_usuario_programas, { tblUsuarioDocIdentidad: req.body.doc_identidad }, null, (programa) => {
                tbl_programas.sync().then(function () {
                    crud.findOne(tbl_programas, { codigo: programa.tblProgramaCodigo, tblSedeId: programa.tblProgramaSede, programa: programa.tblProgramaPrograma }, null, (resp) => {
                        res.status(200).json(resp).end();
                    });
                });
            });
        });
    },

    // buscador de las areas
    buscar_Area: function (req, res, next) {
        tbl_areas.sync().then(function () {
            crud.findOne(tbl_areas, { id: req.body.id }, null, (resp) => {
                res.status(200).json(resp).end();
            });
        });
    },

    // buscador de las facultades
    buscar_Facultad: function (req, res, next) {
        tbl_facultades.sync().then(function () {
            crud.findOne(tbl_facultades, { id: req.body.id }, null, (resp) => {
                res.status(200).json(resp).end();
            });
        });
    },

    // buscador de las etapas del plan de trabajo
    buscar_Etapa: function (req, res, next) {
        tbl_etapas.sync().then(function () {
            crud.findAll(tbl_etapas, null, "id ASC", (resp) => {
                res.status(200).json(resp).end();
            });
        });
    },

    // buscador de los actorores
    buscar_Actor: function (req, res, next) {
        tbl_actores.sync().then(function () {
            crud.findAll(tbl_actores, null, "id ASC", (resp) => {
                res.status(200).json(resp).end();
            });
        })
    },

    // buscador de los permidos de los usuarios
    buscar_Permisos: function (req, res, next) {
        crud.buscar_Permisos(req.body.tblUsuarioDocIdentidad, (permisos) => {
            res.status(200).json(permisos).end();
        });
    },

    // guardador de los permisos de los usuarios
    guardar_Permisos: function (req, res, next) {
        crud.findAll(tbl_permisos_iniciales, { tblPerfileId: req.body.tblPerfileId }, null, (iniciales) => {
            var permisos = [];
            for (j = 0; j < iniciales.length; j++) {
                permisos.push({ tblRecursoId: iniciales[j].tblRecursoId, tblUsuarioDocIdentidad: req.body.tblUsuarioDocIdentidad, ver: iniciales[j].ver, crear: iniciales[j].crear, modificar: iniciales[j].modificar, eliminar: iniciales[j].eliminar });
            }
            tbl_permisos.sync().then(function () {
                for (var i = 0; i < permisos.length; i++) {
                    crud.create(tbl_permisos, permisos[i], (resp) => {
                        if (resp != 'error') {
                            res.status(200).end();
                        } else {
                            res.sendStatus(403);
                        }
                    });
                }
            });
        });
    },

    enviar_Ptd: function (req, res, next) {
        funciones.buscarDecano(req.body.facultad, (decano) => {
            data = {
                mensaje: 'El docente ' + req.body.docente + ' te ha enviado su plan de trabajo',
                tblUsuarioDocIdentidad: decano,
                fecha: new Date(),
                ptd: req.body.ptd,
                visto: false
            }
            tbl_noticaciones.sync().then(function () {
                crud.create(tbl_noticaciones, data, () => {
                    crud.update(tbl_permisos, { tblRecursoId: 17, tblUsuarioDocIdentidad: req.body.doc_identidad }, { ver: false }, () => {
                        res.status(200).end();
                    })
                })
            })
        });
    },

    reportes: function (req, res, next) {
        crud.reporte((resp) => {
            res.status(200).json(permisos).end();
        })
    }
};