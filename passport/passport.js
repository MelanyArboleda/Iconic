var localStrategy = require('passport-local').Strategy;
var admon = require('.././services/crudService');
var modelo = require('.././database/modelos');
var mail = require('.././controllers/MailController');
var bcrypt = require('bcryptjs');

module.exports = function(passport) {
	//serializa los datos del usuario
	passport.serializeUser(function(user, done){
		done(null, user);
	});
	//deserializa los datos del usuario para poderlos usar
	passport.deserializeUser(function(obj, done){
		done(null, obj);
	});

	passport.use(new localStrategy({passReqToCallback : true}, function(req, user, password, done){		
		var dato = [{
			correo: user
		}];
		//busca conicidencias el la base de datos para poder iniciar sesion
		admon.findAll(modelo.tbl_usuarios, dato, function(data) {			
			if (data !== undefined) {
				//si esta activa las cuenta o las fechas de creado y actualizado del usuario son las mismas de ja seguir con el proceso
				if (data.estado == 1 || data.createdAt.toString() == data.updatedAt.toString()) {
					//si encuentra datos compara las contraseñas
				if (bcrypt.compareSync(password, data.contraseña)) {
					//si las contraseñas coinciden retornamos el usuario
					var codigo = null ;
					if(data.tblEstadoId == 2){
						codigo = mail.codigo(data.correo,data.nombre);
					}
					if (password == '123' && data.estado == 1) {
						codigo = 'passwordNew' ;
					}
			 		return done(null, {
			 			id : data.id,
			 			doc_identidad : data.doc_identidad,
						nombre : data.nombre,
			 			apellido_1 : data.apellido_1,
						apellido_2 : data.apellido_2,
						correo : data.correo,
						estado : data.tblEstadoId,
						perfil : data.tblPerfileId,
						codigo : codigo
			 		});
		 		}
				}
			}
			//de lo contrario retornamos un mensaje de error
			return done(null, false, req.flash('authmessage', 'Usuario y/o contraseña incorrecta.'));
		});
	}));
};