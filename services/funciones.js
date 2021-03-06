const bcrypt = require('bcryptjs');
const crud = require('.././services/crudService');
const tbl_usuarios = require('.././database/tbl_usuarios');
const tbl_usuario_programas = require('.././database/tbl_usuario_programas');
const tbl_concertaciones = require('.././database/tbl_concertaciones');
module.exports = {
	// encriptador de los mensajes que llegan a la funcion
	encriptar: function (clave) {
		var salt = bcrypt.genSaltSync(10);
		var password = bcrypt.hashSync(clave, salt);
		return password;
	},

	// busca usuarios y debuelve unos datos en espesifico
	buscarUser: function (user, callback) {
		crud.findAll(tbl_usuarios, { doc_identidad: user }, null, (data) => {
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

	// busca mensajes de la consertacion
	buscarMensajes: function (channel, callback) {
		tbl_concertaciones.tbl_concertaciones.sync().then(function () {
			crud.findAll(tbl_concertaciones.tbl_concertaciones, { tblPtdId: channel }, "fecha ASC", (msg) => {
				callback(msg);
			});
		});
	},

	//buscar decano
	buscarDecano: function(facultad,callback){
		crud.innerDecano([tbl_usuarios,tbl_usuario_programas],facultad,(decano)=>{
			callback(decano[0].dataValues.doc_identidad);
		})
	}
};