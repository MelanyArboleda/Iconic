const bcrypt = require('bcryptjs');
const crud = require('.././services/crudService');
const modelo = require('.././database/modelos');
//la funcion encripta cualquier dato que llegue y lo retorna
module.exports = {
	encriptar: function (clave) {
		var salt = bcrypt.genSaltSync(10);
		var password = bcrypt.hashSync(clave, salt);
		return password;
	},

	buscarUser: function (user, callback) {
		crud.findAll(modelo.tbl_usuarios, { doc_identidad: user }, null, (data) => {
			callback(user = {
				doc_identidad: data[0].dataValues.doc_identidad,
				nombre: data[0].dataValues.nombre,
				apellido_1: data[0].dataValues.apellido_1,
				apellido_2: data[0].dataValues.apellido_2,
				correo: data[0].dataValues.correo,
				dedicacion: data[0].dataValues.tblDedicacioneId,
				perfil: data[0].dataValues.tblPerfileId,
				estado: data[0].dataValues.tblEstadoId,
				created: data[0].dataValues.createdAt,
				updated: data[0].dataValues.updatedAt
			});
		});
	},

	buscarTabla: function (tabla, callback) {
		var modeloTabla;
		switch (tabla) {
			case 'tbl_ptds':
				modeloTabla = modelo.tbl_ptds;
				break;
			case 'tbl_dodencias_directas':
				modeloTabla = modelo.tbl_dodencias_directas;
				break;
			case 'tbl_investigaciones_proyectos':
				modeloTabla = modelo.tbl_investigaciones_proyectos;
				break;
			case 'tbl_investigaciones_semilleros':
				modeloTabla = modelo.tbl_investigaciones_semilleros;
				break;
			case 'tbl_actividades_extension':
				modeloTabla = modelo.tbl_actividades_extension;
				break;
			case 'tbl_comision_estudios':
				modeloTabla = modelo.tbl_comision_estudios;
				break;
			case 'tbl_formulacion_proyectos':
				modeloTabla = modelo.tbl_formulacion_proyectos;
				break;
			case 'tbl_asesoria_proyectos':
				modeloTabla = modelo.tbl_asesoria_proyectos;
				break;
			case 'tbl_resumenes':
				modeloTabla = modelo.tbl_resumenes;
				break;
			case 'tbl_actividades':
				modeloTabla = modelo.tbl_actividades;
				break;
			case 'tbl_observaciones':
				modeloTabla = modelo.tbl_observaciones;
				break;
			case 'tbl_horarios':
				modeloTabla = modelo.tbl_horarios;
				break;
			case 'tbl_seguimientos_evaluacion':
				modeloTabla = modelo.tbl_seguimientos_evaluacion;
				break;
			case 'tbl_evidencias':
				modeloTabla = modelo.tbl_seguimientotbl_evidenciass_evaluacion;
				break;
		}
		callback(modeloTabla);
	}
};