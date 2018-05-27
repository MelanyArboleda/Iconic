const Sequelize = require('sequelize');
const sequelize = require('./config');
const crud = require('.././services/crudService');
const tbl_ptds = require('./tbl_ptds');
const excelToJson = require('convert-excel-to-json');

// modelo de las docencias directas
var tbl_docencias_directas = sequelize.define('tbl_docencias_directas', {
	codigo_asignatura: {
		type: Sequelize.STRING(15),
		allowNull: false
	},
	nombre_asignatura: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	grupo_asignatura: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	numero_estudiantes: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	horas_semanales: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	estudiante: {
		type: Sequelize.INTEGER
	},
	jefe: {
		type: Sequelize.INTEGER
	},
	tblPtdId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

tbl_ptds.tbl_ptds.hasMany(tbl_docencias_directas);
tbl_docencias_directas.belongsTo(tbl_ptds.tbl_ptds);

module.exports = {
	tbl_docencias_directas: tbl_docencias_directas,

	// buscador de docencias directras
	buscar_DD: function (req, res, next) {
		tbl_docencias_directas.sync().then(function () {
			crud.findAll(tbl_docencias_directas, { tblPtdId: req.body.ptd }, 'id ASC', (resp) => {
				res.status(200).json({ apartado: resp }).end();
			});
		});
	},

	// guardador de docencias directras
	guardar_DD: function (req, res, next) {
		tbl_docencias_directas.sync().then(function () {
			const result = excelToJson({
				sourceFile: './archivos/info.xls'
			});
			var asignaturas = [];
			var asig = result["Asignaturas matriculadas"];
			for (let i = 1; i < asig.length; i++) {
				if (req.body.doc_ident === asig[i].D.toString()){
					asignaturas.push({codigo_asignatura:asig[i].A, nombre_asignatura:asig[i].C, grupo_asignatura:parseInt(asig[i].B), numero_estudiantes:asig[i].G, horas_semanales:asig[i].F, estudiante:null, jefe:null, tblPtdId:req.body.ptd});
				};	
				if (i === asig.length - 1) {
					insertarData(tbl_docencias_directas,asignaturas,()=>{
						res.status(200).end();
					});
				}
			}
		});
	},

	// modificador de docencias directras
	modificar_DD: function (req, res, next) {
		tbl_docencias_directas.sync().then(function () {
			crud.update(tbl_docencias_directas, { id: req.body.donde }, req.body.datos, (resp) => {
				if (resp == 'update') {
					res.status(200).end();
				} else {
					res.sendStatus(403);
				}
			});
		});
	},

	// eliminador de docencias directras
	eliminar_DD: function (req, res, next) {
		tbl_docencias_directas.sync().then(function () {
			crud.delete(tbl_docencias_directas, { id: req.body.id }, (resp) => {
				if (resp == 'delete') {
					res.status(200).end();
				} else {
					res.sendStatus(403);
				}
			});
		});
	}
};

function insertarData(tabla, datos, callback) {
    tabla.sync().then(function () {
        for (var i = 0; i < datos.length; i++) {
			crud.create(tabla, datos[i],()=>{});
            if (i === datos.length - 1) {
                callback();
            }
        }
    });
}