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
	}
};