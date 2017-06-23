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
		crud.findAll(modelo.tbl_usuarios, { doc_identidad: user }, (data) => {
			callback(user = {
				doc_identidad: data.doc_identidad,
				nombre: data.nombre,
				apellido_1: data.apellido_1,
				apellido_2: data.apellido_2,
				correo: data.correo,
				dedicacion: data.tblDedicacioneId,
				perfil: data.tblPerfileId,
				estado: data.tblEstadoId,
				created: data.createdAt,
				updated: data.updatedAt
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
			case 'tbl_invertigaciones_proyectos':
				modeloTabla = modelo.tbl_invertigaciones_proyectos;
				break;
			case 'tbl_invertigaciones_semilleros':
				modeloTabla = modelo.tbl_invertigaciones_semilleros;
				break;
			case 'tbl_actividades_extension':
				modeloTabla =modelo.tbl_actividades_extension;
				break;
			case 'tbl_comision_estudios':
				modeloTabla =modelo.tbl_comision_estudios;
				break;
			case 'tbl_formulacion_proyectos':
				modeloTabla =modelo.tbl_formulacion_proyectos;
				break;
			case 'tbl_asesoria_proyectos':
				modeloTabla =modelo.tbl_asesoria_proyectos;
				break;
			case 'tbl_resumen':
				modeloTabla =modelo.tbl_resumen;
				break;
			case 'tbl_actividades':
				modeloTabla =modelo.tbl_actividades;
				break;
			case 'tbl_observaciones':
				modeloTabla =modelo.tbl_observaciones;
				break;
			case 'tbl_horarios':
				modeloTabla =modelo.tbl_horarios;
				break;
			case 'tbl_seguimientos_evaluacion':
				modeloTabla =modelo.tbl_seguimientos_evaluacion;
				break;
			case 'tbl_evidencias':
				modeloTabla =modelo.tbl_seguimientotbl_evidenciass_evaluacion;
				break;
		}
		callback(modeloTabla);
	}
};