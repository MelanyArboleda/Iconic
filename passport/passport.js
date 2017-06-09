var localStrategy = require('passport-local').Strategy;
var admon = require('.././database/admon');
var modelo = require('.././database/modelos');
var mail = require('.././controllers/MailController');
var bcrypt = require('bcryptjs');

module.exports = function(passport) {
	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(obj, done){
		done(null, obj);
	});

	passport.use(new localStrategy({passReqToCallback : true}, function(req, user, password, done){		
		var dato = [{
			correo: user
		}];
		admon.findAll(modelo.tbl_usuarios, dato, function(data) {
			if (data !== undefined) {
				if (bcrypt.compareSync(password, data.contraseña)) {
					if(password == "123"){
						mail.codigo(data.correo,12345);
					}
			 		return done(null, {
			 			id : data.id,
			 			doc_identidad : data.doc_identidad,
						nombre : data.nombre,
			 			apellido_1 : data.apellido_1,
						apellido_2 : data.apellido_2,
						correo : data.correo,
						tblEstadoId : data.tblEstadoId,
						tblPerfileId : data.tblPerfileId
			 		});
		 		}
			}
			return done(null, false, req.flash('authmessage', 'Usuario y/o contraseña incorrecta.'));
		});
	}));
};