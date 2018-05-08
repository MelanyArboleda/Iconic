const Sequelize = require('sequelize');
const sequelize = require('./config');
const crud = require('.././services/crudService');
const tbl_ptds = require('./tbl_ptds');

// modelo de lo seguimientos y evaluaciones
var tbl_seguimientos_evaluacion = sequelize.define('tbl_seguimientos_evaluacion', {
    semana: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fecha: {
        type: Sequelize.DATE,
        allowNull: false
    },
    firma_coord_prog: {
        type: Sequelize.BLOB,
        allowNull: false
    },
    firma_docente: {
        type: Sequelize.BLOB,
        allowNull: false
    },
    tblPtdId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

tbl_ptds.tbl_ptds.hasMany(tbl_seguimientos_evaluacion);
tbl_seguimientos_evaluacion.belongsTo(tbl_ptds.tbl_ptds);

module.exports = {
    tbl_seguimientos_evaluacion: tbl_seguimientos_evaluacion,
    //buscaar los seguimientos y las evaluaciones
    buscar_SE: function (req, res, next) {
        tbl_seguimientos_evaluacion.sync().then(function () {
            crud.findAll(tbl_seguimientos_evaluacion, { id: req.body.ptd }, null, (resp) => {
                if (resp[0] == undefined) {
                    res.status(200).json({ apartado: 0 }).end();
                } else {
                    res.status(200).json({ apartado: resp[0].dataValues }).end();
                }
            });
        });
    },
    //guardar los seguimientos y las evaluaciones
    guardar_SE: function (req, res, next) {
        tbl_seguimientos_evaluacion.sync().then(function () {
            if (req.body.datos.id == undefined) {
                req.body.datos.id = null;
                crud.create(tbl_seguimientos_evaluacion, req.body.datos, (resp) => {
                    if (resp != 'error') {
                        res.status(200).end();
                    } else {
                        res.sendStatus(403);
                    }
                });
            } else {
                crud.update(tbl_seguimientos_evaluacion, { id: req.body.datos.id }, req.body.datos, (resp) => {
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