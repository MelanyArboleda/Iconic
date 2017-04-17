var localStrategy = require('passport-local').Strategy;
var postgresql = require('pg').Pool;
var bcrypt = require('bcryptjs');

module.exports = function(passport) {
	
	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(obj, done){
		done(null, obj);
	});

	passport.use(new localStrategy({
		passReqToCallback : true
	}, function(req, user, password, done){
		
		var config = require('.././database/config');
		var pool = new postgresql(config);

		pool.query('SELECT * FROM tbl_usuarios WHERE usuario = $1', [user], function(err, result){
			if (err) throw err;

			if (result.rows.length > 0) {
				var user = result.rows[0];
				console.log(user, password)

				if (bcrypt.compareSync(password, user.clave)) {
					return done(null, {
						id : user.id,
						user : user.user 
					});
				}
			} 

			return done(null, false, req.flash('authmessage', 'Usuario y/o contraseña incorrecta.'));
		});
	}
	));
};