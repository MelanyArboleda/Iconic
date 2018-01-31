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
    //inner join planes
    innerPlanes: function (tabla, donde, callback) {
        sequelize.query('SELECT  id, "tbl_ptds"."tblUsuarioDocIdentidad", fecha, semestre,  "tbl_ptds"."version", observaciones_dd, "createdAt", "updatedAt" FROM "tbl_ptds" AS "tbl_ptds" INNER JOIN (SELECT "tbl_ptds"."tblUsuarioDocIdentidad", max("tbl_ptds"."version") AS "version" FROM "tbl_ptds" AS "tbl_ptds" INNER JOIN "tbl_usuarios" AS "tbl_usuario" ON "tbl_ptds"."tblUsuarioDocIdentidad" = "tbl_usuario"."doc_identidad" INNER JOIN "tbl_usuario_programas" AS "tbl_usuario.tbl_usuario_programas" ON "tbl_usuario"."doc_identidad" = "tbl_usuario.tbl_usuario_programas"."tblUsuarioDocIdentidad" INNER JOIN "tbl_programas" AS "tbl_usuario.tbl_usuario_programas.tbl_programa" ON "tbl_usuario.tbl_usuario_programas"."tblProgramaCodigo" = "tbl_usuario.tbl_usuario_programas.tbl_programa"."codigo" INNER JOIN "tbl_areas" AS "tbl_usuario.tbl_usuario_programas.tbl_programa.tbl_area" ON "tbl_usuario.tbl_usuario_programas.tbl_programa"."tblAreaId" = "tbl_usuario.tbl_usuario_programas.tbl_programa.tbl_area"."id" INNER JOIN "tbl_facultades" AS "tbl_usuario.tbl_usuario_programas.tbl_programa.tbl_area.tbl_facultade" ON "tbl_usuario.tbl_usuario_programas.tbl_programa.tbl_area"."tblFacultadeId" = "tbl_usuario.tbl_usuario_programas.tbl_programa.tbl_area.tbl_facultade"."id" AND "tbl_usuario.tbl_usuario_programas.tbl_programa.tbl_area.tbl_facultade"."id" = '+donde.id+' WHERE "tbl_ptds"."semestre" = '+donde.semestre+' AND'+
        '(date_part('+"'year'"+', "tbl_ptds"."fecha") = '+donde.ano+') GROUP BY "tbl_ptds"."tblUsuarioDocIdentidad") AS "UltimateVersion" ON "UltimateVersion"."tblUsuarioDocIdentidad" = "tbl_ptds"."tblUsuarioDocIdentidad" AND "UltimateVersion"."version" = "tbl_ptds"."version";').spread((results, metadata) => {
            callback(results);
        });

        // tabla[0].findAll({
        //     attributes: ['tblUsuarioDocIdentidad',
        //         [sequelize.fn('max', sequelize.col('tbl_ptds.version')),'version'],
        //         'createdAt', 'updatedAt'
        //     ],
        //     group: '"tbl_ptds"."tblUsuarioDocIdentidad"',
        //     where: {
        //         semestre: donde.semestre,
        //         $and: [
        //             sequelize.where(sequelize.fn('date_part', 'year', sequelize.col('tbl_ptds.fecha')), donde.ano),
        //         ]
        //     },
        //     include: [{
        //         model: tabla[1], required: true, attributes: [],
        //         include: [{
        //             model: tabla[2], required: true, attributes: [],
        //             include: [{
        //                 model: tabla[3], required: true, attributes: [],
        //                 include: [{
        //                     model: tabla[4], required: true, attributes: [],
        //                     include: [{
        //                         model: tabla[5], required: true, attributes: [], where: { id: donde.id }
        //                     }]
        //                 }]
        //             }]
        //         }]
        //     }]
        // }).then((tabla) => {
        //     callback(tabla);
        // }).catch((err) => {
        //     console.log(err);
        //     callback();
        // });
    },
    //inner join usuarios
    innerUser: function (tabla, donde, callback) {
        tabla[0].findAll({
            attributes: ['doc_identidad','nombre','apellido_1','apellido_2','correo','tblPerfileId','tblEstadoId'
            ],
            include: [{
                model: tabla[1], required: true, attributes: [],
                include: [{
                    model: tabla[2], required: true, attributes: [],
                    include: [{
                        model: tabla[3], required: true, attributes: [],
                        include: [{
                            model: tabla[4], required: true, attributes: [],where: { id: donde.id }
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
        sequelize.query('SELECT "tblRecursoId", "tblUsuarioDocIdentidad", "ver", "crear", "modificar", "eliminar", "createdAt", "updatedAt" FROM "tbl_permisos" AS "tbl_permisos" WHERE "tbl_permisos"."tblUsuarioDocIdentidad" = '+"'"+donde+"'"+' ORDER BY "tblRecursoId" ASC;').spread((results, metadata) => {
            callback(results);
        });
    }
}