// module.exports = function(passport) {
// 	//serializa los datos del usuario
// 	passport.serializeUser(function(user, done){
// 		done(null, user);
// 	});
// 	//deserializa los datos del usuario para poderlos usar
// 	passport.deserializeUser(function(obj, done){
// 		done(null, obj);
// 	});

// 	passport.use(new localStrategy({passReqToCallback : true}, function(req, user, password, done){		
// 		var dato = [{
// 			correo: user
// 		}];
// 		//busca conicidencias el la base de datos para poder iniciar sesion
// 		crud.findAll(modelo.tbl_usuarios, dato, function(data) {			
// 			if (data !== undefined) {
// 				//si esta activa las cuenta o las fechas de creado y actualizado del usuario son las mismas de ja seguir con el proceso
// 				if (data.estado == 1 || data.createdAt.toString() == data.updatedAt.toString()) {
// 					//si encuentra datos compara las contraseñas
// 				if (bcrypt.compareSync(password, data.contraseña)) {
// 					//si las contraseñas coinciden retornamos el usuario
// 					var codigo = null ;
// 					if(data.tblEstadoId == 2){
// 						codigo = mail.codigo(data.correo,data.nombre);
// 					}
// 					if (password == '123' && data.estado == 1) {
// 						codigo = 'passwordNew' ;
// 					}
// 			 		return done(null, {
// 			 			id : data.id,
// 			 			doc_identidad : data.doc_identidad,
// 						nombre : data.nombre,
// 			 			apellido_1 : data.apellido_1,
// 						apellido_2 : data.apellido_2,
// 						correo : data.correo,
// 						estado : data.tblEstadoId,
// 						perfil : data.tblPerfileId,
// 						codigo : codigo
// 			 		});
// 		 		}
// 				}
// 			}
// 			//de lo contrario retornamos un mensaje de error
// 			return done(null, false, req.flash('authmessage', 'Usuario y/o contraseña incorrecta.'));
// 		});
// 	}));
// };

// var localStrategy = require('passport-local').Strategy;
var crud = require('.././services/crudService');
var modelo = require('.././database/modelos');
var mail = require('.././controllers/MailController');
var bcrypt = require('bcryptjs');

const cfg = require('../config/config');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
	secretOrKey: cfg.secret,
	jwtFromRequest: ExtractJwt.fromAuthHeader()
};

class auth {
	static passportStrategy() {
		var strategy = new Strategy(params, function (payload, done) {
			// var user = users[payload.id] || null;
			console.log(payload);
			crud.findAll(modelo.tbl_usuarios, { correo: payload.correo }, function (data) {
				if (data !== undefined) {
					//si esta activa las cuenta o las fechas de creado y actualizado del usuario son las mismas de ja seguir con el proceso
					if (data.estado == 1) {
						//si encuentra datos compara las contraseñas
						// if (bcrypt.compareSync(payload.password, data.contraseña)) {
						//si las contraseñas coinciden retornamos el usuario



						return done(null, {
							doc_identidad: data.doc_identidad,
							nombre: data.nombre,
							apellido_1: data.apellido_1,
							apellido_2: data.apellido_2,
							correo: data.correo,
							dedicacion: data.tblDedicacioneId,
							perfil: data.tblPerfileId,
							estado: data.tblEstadoId,
							codigo: codigo
						});
						// }
					}
				}
				//de lo contrario retornamos un mensaje de error
				return done(new Error('Usuario y/o contraseña incorrecta.'), null);
			});


		});

		passport.use(strategy);
		return {
			initialize: function () {
				return passport.initialize();
			},
			authenticate: function () {
				return passport.authenticate("jwt", cfg.jwtSession);
			}
		};
	}

	static initialize() {
		return passport.initialize();
	}

	static authenticate() {
		return passport.authenticate("jwt", cfg.jwtSession);
	}
}

module.exports = auth;