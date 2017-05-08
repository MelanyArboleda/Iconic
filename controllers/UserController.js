var postgresql = require('pg').Pool;
var encriptar = require('.././controllers/Encriptar_password');
var idin;
module.exports = {
	
	getSingUp : function(req, res, next){
		return res.render('users/singup',{
			isAuthenticated : req.isAuthenticated(),
			user : req.user
		});
	},

	logout : function (req, res, next) {
		req.logout();
		res.redirect('/');
	},

	recup : function(req, res, next){
		idin = req.params[0];
		res.render('users/recu');
	},

	nueva : function(req, res, next){
		for (var i = 0; i < 4; i++) {
			b = new Buffer(idin, 'base64')
			idin = b.toString();
		}

		var config = require('.././database/config');
		var pool = new postgresql(config);
		var password = encriptar(req.body.clave)
		console.log(req.body[0	]);
		pool.query('UPDATE tbl_usuarios set clave = $1 WHERE id = $2', [password,idin], function(err, result){
			if (err) throw err;
		 	if (!err) {
		 		res.redirect('/');
		 	}
		});
	}
}; 