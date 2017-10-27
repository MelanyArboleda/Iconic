const crud = require('.././services/crudService');
const tbl_usuario_programas = require('.././database/tbl_usuario_programas');
const tbl_programas = require('.././database/tbl_programas');
const tbl_areas = require('.././database/tbl_areas');
const tbl_dedicaciones = require('.././database/tbl_dedicaciones');

module.exports = {
    buscar_Area: function (req, res, next) {
        crud.findOne(tbl_usuario_programas, { tblUsuarioDocIdentidad: req.body.doc_identidad }, null, (programa) => {
            crud.innerArea([tbl_areas, tbl_programas], { codigo: programa.tblProgramaCodigo }, (area) => {
                res.status(200).json(area).end();
            });
        });
    },
    buscar_Dedicacion: function (req, res, next) {
        crud.findOne(tbl_dedicaciones, { id: req.body.id }, null, (dedicacion) => {
            res.status(200).json(dedicacion).end();
        });
    }
};