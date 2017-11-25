const crud = require('.././services/crudService');
const tbl_perfiles = require('.././database/tbl_perfiles');
const tbl_usuario_programas = require('.././database/tbl_usuario_programas');
const tbl_programas = require('.././database/tbl_programas');
const tbl_areas = require('.././database/tbl_areas');
const tbl_facultades = require('.././database/tbl_facultades');
const tbl_etapas = require('.././database/tbl_etapas');
const tbl_materias = require('.././database/tbl_materias');
const tbl_materias_programas = require('.././database/tbl_materias_programas');
const tbl_actores = require('.././database/tbl_actores');


module.exports = {
    buscar_Perfil: function (req, res, next) {
        crud.findOne(tbl_perfiles, { id: req.body.id }, null, (perfil) => {
            res.status(200).json(perfil).end();
        });
    },

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

    buscar_Area: function (req, res, next) {
        tbl_areas.sync().then(function () {
            crud.findOne(tbl_areas, { id: req.body.id }, null, (resp) => {
                res.status(200).json(resp).end();
            });
        });
    },

    buscar_Facultad: function (req, res, next) {
        tbl_facultades.sync().then(function () {
            crud.findOne(tbl_facultades, { id: req.body.id }, null, (resp) => {
                res.status(200).json(resp).end();
            });
        });
    },

    buscar_Etapa: function (req, res, next) {
        tbl_etapas.sync().then(function () {
            crud.findAll(tbl_etapas, null, "id ASC", (resp) => {
                res.status(200).json(resp).end();
            });
        });
    },

    buscar_Materias: function (req, res, next) {
        tbl_materias.sync().then(function () {
            crud.innerMateria([tbl_materias, tbl_materias_programas, tbl_programas], { tblAreaId: req.body.id }, (resp) => {
                res.status(200).json(resp).end();
            });
        });
    },

    buscar_Actor: function (req, res, next) {
        tbl_actores.sync().then(function () {
            crud.findAll(tbl_actores, null, "id ASC", (resp) => {
                res.status(200).json(resp).end();
            });
        })
    }
};