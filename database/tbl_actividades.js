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
        type: Sequelize.INTEGER,
        allowNull: false
    },
    descripcion_productos: {
        type: Sequelize.STRING,
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

    buscar_actividades: function (req, res, next) {
        tbl_actividades.sync().then(function () {
            crud.findAll(tbl_actividades, { tblResumeneId: req.body.id }, 'id ASC', (resp) => {
                res.status(200).json({ apartado: resp }).end();
            });
        });
    },

    guardar_actividades: function (req, res, next) {
        tbl_actividades.sync().then(function () {
            if (req.body.datos.id == undefined) {
                req.body.datos.id = null;
                crud.create(tbl_actividades, req.body.datos, (resp) => {
                    if (resp != 'error') {
                        res.status(200).end();
                    } else {
                        res.sendStatus(403);
                    }
                });
            } else {
                crud.update(tbl_actividades, { id: req.body.datos.id }, req.body.datos, (resp) => {
                    if (resp == 'update') {
                        res.status(200).end();
                    } else {
                        res.sendStatus(403);
                    }
                });
            }
        });
    },

};