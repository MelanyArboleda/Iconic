const Sequelize = require('sequelize');
const sequelize = require('./config');
const crud = require('.././services/crudService');
const tbl_resumenes = require('./tbl_resumenes');

var tbl_actividades = sequelize.define('tbl_actividades', {
    nombre_actividad: {
        type: Sequelize.STRING,
        allowNull: false
    },
    horas_semanales: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    descripcion_productos: {
        type: Sequelize.STRING,
        allowNull: false
    },
    conexa:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    tblResumeneId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

tbl_resumenes.tbl_resumenes.hasMany(tbl_actividades);
tbl_actividades.belongsTo(tbl_resumenes.tbl_resumenes);

module.exports = {
    tbl_actividades: tbl_actividades,

    buscar_OA: function (req, res, next) {
        tbl_actividades.sync().then(function () {
            crud.findAll(tbl_actividades, { tblResumeneId: req.body.id }, 'id ASC', (resp) => {
                res.status(200).json({ apartado: resp }).end();
            });
        });
    },

    guardar_OA: function (req, res, next) {
        tbl_actividades.sync().then(function () {
            crud.create(tbl_actividades, req.body, (resp) => {
                if (resp != 'error') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    modificar_OA: function (req, res, next) {
        tbl_actividades.sync().then(function () {
            crud.update(tbl_actividades, { id: req.body.donde }, req.body.datos, (resp) => {
                if (resp == 'update') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    eliminar_OA: function (req, res, next) {
        tbl_actividades.sync().then(function () {
            crud.delete(tbl_actividades, { id: req.body.id }, (resp) => {
                if (resp == 'delete') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

};