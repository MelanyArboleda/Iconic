var Sequelize = require('sequelize');
var sequelize = require('./config');
const crud = require('.././services/crudService');
var tbl_ptds = require('./tbl_ptds');

var tbl_comision_estudios = sequelize.define('tbl_comision_estudios', {
    universidad: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo_estudio: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nombre_estudio: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fecha_inicio: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fecha_graduacion: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fecha_obtencion_autorizacion: {
        type: Sequelize.DATE,
        allowNull: false
    },
    aportes_inst_obtenidos: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tblPtdId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

tbl_ptds.tbl_ptds.hasMany(tbl_comision_estudios);
tbl_comision_estudios.belongsTo(tbl_ptds.tbl_ptds);

module.exports = {
    tbl_comision_estudios: tbl_comision_estudios,
    
    buscar_CE: function (req, res, next) {
        tbl_comision_estudios.sync().then(function () {
            crud.findAll(tbl_comision_estudios, { tblPtdId: req.body.ptd }, 'id ASC', (resp) => {
                res.status(200).json({ apartado: resp }).end();
            });
        });
    },

    guardar_CE: function (req, res, next) {
        tbl_comision_estudios.sync().then(function () {
            crud.create(tbl_comision_estudios, req.body, (resp) => {
                if (resp != 'error') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    modificar_CE: function (req, res, next) {
        tbl_comision_estudios.sync().then(function () {
            crud.update(tbl_comision_estudios, { id: req.body.donde }, req.body.datos, (resp) => {
                if (resp == 'update') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    eliminar_CE: function (req, res, next) {
        tbl_comision_estudios.sync().then(function () {
            crud.delete(tbl_comision_estudios, { id: req.body.id }, (resp) => {
                if (resp == 'delete') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    }

};