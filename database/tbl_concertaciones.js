const Sequelize = require('sequelize');
const sequelize = require('./config');
const tbl_usuarios = require('./tbl_usuarios');
const funciones = require('.././services/funciones');
const tbl_ptds = require('./tbl_ptds');
const crud = require('.././services/crudService');

var tbl_concertaciones = sequelize.define('tbl_concertaciones', {
    tblUsuarioDocIdentidad: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    tblPtdId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mensaje: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fecha: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

tbl_usuarios.hasMany(tbl_concertaciones);
tbl_concertaciones.belongsTo(tbl_usuarios);
tbl_ptds.tbl_ptds.hasMany(tbl_concertaciones);
tbl_concertaciones.belongsTo(tbl_ptds.tbl_ptds);
// sequelize.query('ALTER TABLE tbl_concertaciones ADD CONSTRAINT tbl_concertaciones_tblUsuarioDocIdentidad_fkey FOREIGN KEY (tblUsuarioDocIdentidad) REFERENCES tbl_usuarios (doc_identidad) MATCH FULL').spread((results, metadata) => {
// });

module.exports = {
    tbl_concertaciones: tbl_concertaciones,

    guardar_Concertacion: function (req, res, next) {
        tbl_concertaciones.sync().then(function () {
            crud.create(tbl_concertaciones, req.body.concertacion, (resp) => {
                if (resp != 'error') {
                    crud.findOne(tbl_usuarios, { doc_identidad: req.body.concertacion.tblUsuarioDocIdentidad }, null, (resp2) => {
                        res.status(200).json({ user: resp2.nombre + " " + resp2.apellido_1 + " " + resp2.apellido_2, concertacion: resp }).end();
                    });
                } else {
                    res.sendStatus(403);
                }
            });
        });
    }
};