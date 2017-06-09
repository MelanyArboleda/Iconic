var encriptar = require('.././controllers/EncriptarController');
var admon = require('.././database/admon');
var modelo = require('.././database/modelos');
var user;
module.exports = {

	getSingUp: function (req, res, next) {
		return res.render('users/singup', {
			isAuthenticated: req.isAuthenticated(),
			user: req.user
		});
	},

	logout: function (req, res, next) {
		req.logout();
		res.redirect('/');
	},

	recup: function (req, res, next) {
		var idin = req.params[0];
		idin = idin.split("/");
		user = idin[0];
		var fecha = new Buffer(idin[1], 'base64');
		fecha = fecha.toString();
		var date = new Date();
		var fecha_act = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
		for (var i = 0; i < 4; i++) {
			b = new Buffer(user, 'base64')
			user = b.toString();
		}
		var donde = [{
			doc_identidad: user
		}];
		admon.findAll(modelo.tbl_usuarios, donde, function (data) {
			if (data !== undefined) {
				if (fecha >= fecha_act) {
					if (data.recuperar == true) {
						res.render('users/recu');
					} else {
						res.redirect('/');
					}
				} else {
					var datos = {
						recuperar: false
					};
					admon.update(modelo.tbl_usuarios, donde, datos, function (data) { });
					res.redirect('/');
				}
			} else {
				console.log(err);
				res.redirect('/');
			}
		});
	},

	nueva: function (req, res, next) {
		var datos = {
			contraseña: encriptar(req.body.contraseña),
			recuperar: false
		};
		var donde = [{
			doc_identidad: user
		}];
		admon.update(modelo.tbl_usuarios, donde, datos, function (data) {
			if (data == 'update') {
				res.redirect('/');
			}
		});
	}
}; 