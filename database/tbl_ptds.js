const Sequelize = require('sequelize');
const sequelize = require('./config');
const tbl_usuarios = require('./tbl_usuarios');
const crud = require('.././services/crudService');
const tbl_usuario_programas = require('.././database/tbl_usuario_programas');
const tbl_facultades = require('.././database/tbl_facultades');
const tbl_areas = require('.././database/tbl_areas');
const tbl_programas = require('.././database/tbl_programas');
const tbl_fechas_etapas = require('.././database/tbl_fechas_etapas');
const moment = require('moment');
const funciones = require('.././services/funciones');
const groupArray = require('group-array');

var tbl_ptds = sequelize.define('tbl_ptds', {
    tblUsuarioDocIdentidad: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    fecha: {
        type: Sequelize.DATE,
        allowNull: false
    },
    semestre: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    version: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    observaciones_dd: {
        type: Sequelize.STRING
    }
});

tbl_usuarios.hasMany(tbl_ptds);
tbl_ptds.belongsTo(tbl_usuarios);

module.exports = {
    tbl_ptds: tbl_ptds,

    crear_Ptd: function (req, res, next) {
        crud.findOne(tbl_usuario_programas, { tblUsuarioDocIdentidad: req.body.doc_identidad }, null, (programa) => {
            crud.innerFacultad([tbl_facultades, tbl_areas, tbl_programas], { codigo: programa.tblProgramaCodigo }, (facultad) => {
                crud.findOne(tbl_fechas_etapas.tbl_fechas_etapas, { tblFacultadeId: facultad.id, tblEtapaId: 1 }, 'ano desc, semestre desc', (fechas) => {
                    var datos = {
                        tblUsuarioDocIdentidad: req.body.doc_identidad,
                        fecha: moment().format("MM-DD-YYYY"),
                        semestre: fechas.semestre,
                        version: 1
                    }
                    tbl_ptds.sync().then(function () {
                        crud.findOrCreate(tbl_ptds, datos, { tblUsuarioDocIdentidad: datos.tblUsuarioDocIdentidad, semestre: datos.semestre }, 'version desc', (ptd, resp) => {
                            res.status(200).json({ ptd: ptd }).end();
                        });
                    });
                });
            });
        });
    },

    buscar_Ptd: function (req, res, next) {
        tbl_ptds.sync().then(function () {
            crud.findAll(tbl_ptds, { id: req.body.ptd }, null, (resp) => {
                if (resp[0] == undefined) {
                    res.status(200).json({ apartado: 0 }).end();
                } else {
                    res.status(200).json({ apartado: resp[0].dataValues }).end();
                }
            });
        });
    },

    buscar_Ptds_Facultad: function (req, res, next) {
        tbl_ptds.sync().then(function () {
            crud.innerPlanesFacultad([tbl_ptds, tbl_usuarios, tbl_usuario_programas, tbl_programas, tbl_areas, tbl_facultades], req.body, (resp) => {
                var array = groupArray(resp, 'tblUsuarioDocIdentidad');
                var ptds = [];
                for (var obj in array) {
                    ptds.push(array[obj].find(function (ptd) {
                        return ptd.version == Math.max.apply(Math, array[obj].map(function (o) { return o.version }))
                    }));
                }
                res.status(200).json(ptds).end();
            });
        });
    },

    buscar_Ptds_Programa: function (req, res, next) {
        tbl_ptds.sync().then(function () {
            crud.innerPlanesPrograma([tbl_ptds, tbl_usuarios, tbl_usuario_programas, tbl_programas], req.body, (resp) => {
                var array = groupArray(resp, 'tblUsuarioDocIdentidad');
                var ptds = [];
                for (var obj in array) {
                    ptds.push(array[obj].find(function (ptd) {
                        return ptd.version == Math.max.apply(Math, array[obj].map(function (o) { return o.version }))
                    }));
                }
                res.status(200).json(ptds).end();
            });
        });
    },

    buscar_Ptds: function (req, res, next) {
        tbl_ptds.sync().then(function () {
            crud.buscarPtds(tbl_ptds, req.body, (resp) => {
                var array = groupArray(resp, 'tblUsuarioDocIdentidad');
                var ptds = [];
                for (var obj in array) {
                    ptds.push(array[obj].find(function (ptd) {
                        return ptd.version == Math.max.apply(Math, array[obj].map(function (o) { return o.version }))
                    }));
                }
                res.status(200).json(ptds).end();
            });
        });
    },

    guardar_Ptd: function (req, res, next) {
        crud.update(tbl_ptds, { id: req.body.datos.id }, req.body.datos, (resp) => {
            if (resp == 'update') {
                res.status(200).end();
            } else {
                res.sendStatus(403);
            }
        });
    },

};