const Sequelize = require('sequelize');
const sequelize = require('./config');
const crud = require('.././services/crudService');
const tbl_ptds = require('./tbl_ptds');

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
		allowNull: false,
		unique: true
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

	buscar_DD: function (req, res, next) {
		tbl_docencias_directas.sync().then(function () {
			crud.findAll(tbl_docencias_directas, { tblPtdId: req.body.ptd }, 'id ASC', (resp) => {
				res.status(200).json({ apartado: resp }).end();
			});
		});
	},

	guardar_DD: function (req, res, next) {
		tbl_docencias_directas.sync().then(function () {
			crud.create(tbl_docencias_directas, req.body, (resp) => {
				if (resp != 'error') {
					res.status(200).end();
				} else {
					res.sendStatus(403);
				}
			});
		});
	},

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