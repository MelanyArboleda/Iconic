const Sequelize = require('sequelize');
const sequelize = require('./config');
const tbl_usuarios = require('./tbl_usuarios');
const crud = require('.././services/crudService');
const tbl_usuario_programas = require('.././database/tbl_usuario_programas');
const tbl_facultades = require('.././database/tbl_facultades');
const tbl_areas = require('.././database/tbl_areas');
const tbl_programas = require('.././database/tbl_programas');
const tbl_fechas_etapas = require('.././database/tbl_fechas_etapas');
const tbl_sedes = require('.././database/tbl_sedes');
const moment = require('moment');
const groupArray = require('group-array');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const tbl_permisos_iniciales = require('.././database/tbl_permisos_iniciales');
const tbl_permisos = require('.././database/tbl_permisos');

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

    buscar_Ptds_User: function (req, res, next) {
        tbl_ptds.sync().then(function () {
            crud.buscarPtdsUser(tbl_ptds, req.body, (resp) => {
                res.status(200).json(resp).end();
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

    guardar_Archivo: function (req, res, next) {
        if (!fs.existsSync('./archivos')) {
            fs.mkdir('./archivos', (err) => {
                if (err) { res.sendStatus(403); }
            });
        }
        var base64Data = req.body.info.replace(/^data:application\/vnd.ms-excel;base64,/, "");

        fs.writeFile('./archivos/info.xls', base64Data, { encoding: 'base64' }, (err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                res.status(200).end();
            };
        });
    },

    llenar_DataBase: function (req, res, next) {
        const result = excelToJson({
            sourceFile: './archivos/info.xls'
        });
        var facultades = [];
        var sedes = [];
        for (let i = 1; i < result.Programas.length; i++) {
            buscarFacultad(facultades, result.Programas[i].C, (resp) => {
                if (resp == undefined) {
                    facultades.push({ facultad: result.Programas[i].C });
                }
            });

            buscarSede(sedes, result.Programas[i].D, (resp => {
                if (resp == undefined) {
                    sedes.push({ sede: result.Programas[i].D });
                }
            }));

        }
        insertarData(tbl_facultades, facultades, () => {
            insertarData(tbl_sedes, sedes, () => {
                llenarArea((areas) => {
                    insertarData(tbl_areas, areas, () => {
                        llenarPrograma(result.Programas, (programas) => {
                            insertarData(tbl_programas, programas, () => {
                                llenarProgramaAreaFacultad((programasAreaFacultad) => {
                                    insertarData(tbl_programas, programasAreaFacultad, () => {
                                        llenarUsuario(result["Datos docentes"], (usuarios) => {
                                            insertarData(tbl_usuarios, usuarios, () => {
                                                res.status(200).end();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
};

function insertarData(tabla, datos, callback) {
    tabla.sync().then(function () {
        for (var i = 0; i < datos.length; i++) {
            crud.findOrCreate(tabla, datos[i], datos[i], null, function (argument) { });
            if (i === datos.length - 1) {
                callback();
            }
        }
    });
}

function buscarFacultad(facultades, dato, callback) {
    callback(facultades.find((fac) => {
        return fac.facultad === dato;
    }));
}

function buscarSede(sedes, dato, callback) {
    callback(sedes.find((s) => {
        return s.sede === dato;
    }));
}

function llenarArea(callback) {
    crud.findAll(tbl_facultades, null, null, (facultadData) => {
        var areas = [];
        for (let i = 0; i < facultadData.length; i++) {
            areas.push({ area: facultadData[i].dataValues.facultad, tblFacultadeId: facultadData[i].dataValues.id });
            if (i === facultadData.length - 1) {
                callback(areas);
            }
        }
    });
}

function llenarPrograma(data, callback) {
    crud.findAll(tbl_facultades, null, null, (facultadData) => {
        crud.findAll(tbl_sedes, null, null, (sedesData) => {
            var programas = [];
            for (let j = 1; j < data.length; j++) {
                programas.push({ codigo: '' + data[j].A, tblSedeId: buscarDatoSede(sedesData, data[j].D), programa: data[j].B, tblAreaId: buscarDatoFacultad(facultadData, data[j].C) });
                if (j === data.length - 1) {
                    callback(programas);
                }
            }
        });
    });
}

function llenarProgramaAreaFacultad(callback) {
    crud.findAll(tbl_areas, null, null, (areaData) => {
        var programas = [];
        for (let i = 0; i < areaData.length; i++) {
            programas.push({ codigo: 'A' + areaData[i].dataValues.id, tblSedeId: 1, programa: areaData[i].dataValues.area, tblAreaId: areaData[i].dataValues.id });
            if (i === areaData.length - 1) {
                callback(programas);
            }
        }
    });
}

function llenarUsuario(usuario, callback) {
    const funciones = require('.././services/funciones');
    var usuarios = [];
    for (let i = 1; i < usuario.length; i++) {
        var nombreCompleto = usuario[i].B.split(" ");
        var nombre = "";
        for (let j = 0; j < nombreCompleto.length - 2; j++) {
            nombre = nombre + " " + nombreCompleto[j];
        }
        nombre = nombre.replace(/^\s+/g, '');
        nombre = nombre.replace(/\s+$/g, '');
        usuarios.push({ doc_identidad: "" + usuario[i].A, nombre: nombre, apellido_1: nombreCompleto[nombreCompleto.length - 2], apellido_2: nombreCompleto[nombreCompleto.length - 1], correo: usuario[i].C, contraseña: funciones.encriptar("Iconic123"), contraseña_firma: funciones.encriptar("0"), tblDedicacioneId: 1, tblPerfileId: 1, tblEstadoId: 3, recuperar: false });
        if (i === usuario.length - 1) {
            callback(usuarios);
        }
    }
}

function buscarDatoSede(array, dato) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].dataValues.sede === dato) {
            return array[i].dataValues.id;
        }
    }
}

function buscarDatoFacultad(array, dato) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].dataValues.facultad === dato) {
            return array[i].dataValues.id;
        }
    }
}