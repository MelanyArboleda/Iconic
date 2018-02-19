var Sequelize = require('sequelize');
var sequelize = require('../database/config');
module.exports = {
    //Busqueda e inserto
    findOrCreate: function (tabla, dato, donde, order, callback) {
        tabla.findOrCreate({
            where: donde,
            defaults: dato,
            order: order
        }).spread((tabla, created) => {
            console.log(tabla.get({
                plain: true
            }))
            console.log(created);
            callback(tabla.dataValues, created);
        });
    },
    //buscar todo
    findAll: function (tabla, donde, order, callback) {
        tabla.findAll({
            where: donde,
            order: order
        }).then((tabla) => {
            callback(tabla);
        }).catch((err) => {
            console.log(err);
            callback();
        });
    },
    //crear
    create: function (tabla, dato, callback) {
        tabla.create(dato).then((res) => {
            callback(res.dataValues)
        }).catch((e) => {
            console.log("Error" + e);
            callback('error')
        });
    },
    //modificar espesifico
    update: function (tabla, donde, dato, callback) {
        tabla.update(dato, { where: donde }).then(() => {
            callback('update')
        }).catch((e) => {
            console.log("Error" + e);
            callback('error')
        });
    },
    //eliminar espesifico
    delete: function (tabla, donde, callback) {
        tabla.destroy({ where: donde }).then(() => {
            callback('delete')
        }).catch((e) => {
            console.log("Error" + e);
            callback('error')
        });
    },
    //inner join facultad
    innerFacultad: function (tabla, donde, callback) {
        tabla[0].findAll({
            attributes: ['id', 'facultad'],
            include: [{
                model: tabla[1], required: true, attributes: [],
                include: [{
                    model: tabla[2], required: true, attributes: [], where: donde
                }]
            }]
        }).then((tabla) => {
            callback(tabla[0].dataValues);
        }).catch((err) => {
            console.log(err);
            callback();
        });
    },
    //buscar el uno
    findOne: function (tabla, donde, order, callback) {
        tabla.findOne({
            where: donde,
            order: order
        }).then((tabla) => {
            callback(tabla.dataValues);
        }).catch((err) => {
            console.log(err);
            callback();
        });
    },
    //inner join area
    innerArea: function (tabla, donde, callback) {
        tabla[0].findAll({
            attributes: ['area'],
            include: [{
                model: tabla[1], required: true, attributes: [], where: donde
            }]
        }).then((tabla) => {
            callback(tabla[0].dataValues);
        }).catch((err) => {
            console.log(err);
            callback();
        });
    },
    //inner join materia
    innerMateria: function (tabla, donde, callback) {
        tabla[0].findAll({
            attributes: ['codigo', 'nombre', 'horas_semanales'],
            include: [{
                model: tabla[1], required: true, attributes: [],
                include: [{
                    model: tabla[2], required: true, attributes: [], where: donde
                }]
            }]
        }).then((tabla) => {
            callback(tabla);
        }).catch((err) => {
            console.log(err);
            callback();
        });
    },
    //inner join planes facultad
    innerPlanesFacultad: function (tabla, donde, callback) {
        tabla[0].findAll({
            where: {
                semestre: donde.semestre,
                $and: [
                    sequelize.where(sequelize.fn('date_part', 'year', sequelize.col('tbl_ptds.fecha')), donde.ano),
                ]
            },
            include: [{
                model: tabla[1], required: true, attributes: [],
                include: [{
                    model: tabla[2], required: true, attributes: [],
                    include: [{
                        model: tabla[3], required: true, attributes: [],
                        include: [{
                            model: tabla[4], required: true, attributes: [],
                            include: [{
                                model: tabla[5], required: true, attributes: [], where: { id: donde.facultad }
                            }]
                        }]
                    }]
                }]
            }]
        }).then((tabla) => {
            callback(tabla);
        }).catch((err) => {
            console.log(err);
            callback();
        });
    },
    //inner join planes programa
    innerPlanesPrograma: function (tabla, donde, callback) {
        tabla[0].findAll({
            where: {
                semestre: donde.semestre,
                $and: [
                    sequelize.where(sequelize.fn('date_part', 'year', sequelize.col('tbl_ptds.fecha')), donde.ano),
                ]
            },
            include: [{
                model: tabla[1], required: true, attributes: [],
                include: [{
                    model: tabla[2], required: true, attributes: [],
                    include: [{
                        model: tabla[3], required: true, attributes: [], where: { codigo: donde.programa.codigo, tblSedeId: donde.programa.tblSedeId, programa: donde.programa.programa }
                    }]
                }]
            }]
        }).then((tabla) => {
            callback(tabla);
        }).catch((err) => {
            console.log(err);
            callback();
        });
    },
    buscarPtds: function(tabla, donde, callback){
        tabla.findAll({
            where: {
                semestre: donde.semestre,
                $and: [
                    sequelize.where(sequelize.fn('date_part', 'year', sequelize.col('tbl_ptds.fecha')), donde.ano),
                ]
            }
        }).then((tabla) => {
            callback(tabla);
        }).catch((err) => {
            console.log(err);
            callback();
        });
    },
    //inner join usuarios
    innerUser: function (tabla, donde, callback) {
        tabla[0].findAll({
            attributes: ['doc_identidad', 'nombre', 'apellido_1', 'apellido_2', 'correo', 'tblPerfileId', 'tblEstadoId'
            ],
            include: [{
                model: tabla[1], required: true, attributes: [],
                include: [{
                    model: tabla[2], required: true, attributes: [],
                    include: [{
                        model: tabla[3], required: true, attributes: [],
                        include: [{
                            model: tabla[4], required: true, attributes: [], where: { id: donde.id }
                        }]
                    }]
                }]
            }]
        }).then((tabla) => {
            callback(tabla);
        }).catch((err) => {
            console.log(err);
            callback();
        });
    },

    buscar_Permisos: function (donde, callback) {
        sequelize.query('SELECT "tblRecursoId", "tblUsuarioDocIdentidad", "ver", "crear", "modificar", "eliminar", "createdAt", "updatedAt" FROM "tbl_permisos" AS "tbl_permisos" WHERE "tbl_permisos"."tblUsuarioDocIdentidad" = ' + "'" + donde + "'" + ' ORDER BY "tblRecursoId" ASC;').spread((results, metadata) => {
            callback(results);
        });
    }
}