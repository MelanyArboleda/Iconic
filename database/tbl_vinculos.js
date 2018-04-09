var Sequelize = require('sequelize');
var sequelize = require('./config');
const crud = require('.././services/crudService');

var tbl_vinculos = sequelize.define('tbl_vinculos', {
    vinculo: {
        type: Sequelize.STRING(25),
        allowNull: false
    }
});

module.exports = {
    tbl_vinculos: tbl_vinculos,

    buscar_VinculosS: function (req, res, next) {
        tbl_vinculos.sync().then(function () {
            crud.findAll(tbl_vinculos, { $or: [{ id: { $eq: 1 } }, { id: { $eq: 2 } }] }, 'id ASC', (resp) => {
                res.status(200).json(resp).end();
            });
        });
    },

    buscar_VinculosP: function (req, res, next) {
        tbl_vinculos.sync().then(function () {
            crud.findAll(tbl_vinculos, { $or: [{ id: { $eq: 3 } }, { id: { $eq: 4 } }] }, 'id ASC', (resp) => {
                res.status(200).json(resp).end();
            });
        });
    }
};