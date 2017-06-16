var encriptar = require('.././controllers/EncriptarController');
var admon = require('.././services/crudService');
var modelo = require('.././database/modelos');
var fs = require('fs');
var user;
module.exports = {

	getSingUp: function (req, res, next) {
		if (req.user.codigo != null) {
			if (req.user.codigo == 'passwordNew') {
				return res.render('users/configp', {
					isAuthenticated: req.isAuthenticated(),
					user: req.user
				});
			} else {
				return res.render('users/verificacion', {
					isAuthenticated: req.isAuthenticated(),
					user: req.user
				});
			}
		} else {
			return res.render('users/singup', {
				isAuthenticated: req.isAuthenticated(),
				user: req.user
			});
		}
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
		admon.findAll(modelo.tbl_usuarios, { doc_identidad: user }, function (data) {
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
					admon.update(modelo.tbl_usuarios, { doc_identidad: user }, datos, function (data) { });
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
		admon.update(modelo.tbl_usuarios, { doc_identidad: user }, datos, function (data) {
			if (data == 'update') {
				res.redirect('/');
			}
		});
	},

	activacion: function (req, res, next) {
		return res.render('users/verificacion', {
			isAuthenticated: req.isAuthenticated(),
			user: req.user
		});
	},

	cambio: function (req, res, next) {
		var codigo = req.body.codigo;
		if (codigo == req.res.req.user.codigo) {
			admon.update(modelo.tbl_usuarios, { doc_identidad: req.res.req.user.doc_identidad }, { tblEstadoId: 1 }, function (data) {
				if (data == 'update') {
					res.redirect('/auth/config');
				}
			});
		} else {
			console.log('intente de nuevo');
			res.redirect('/auth/acti');
		}
	},

	configuracion: function (req, res, next) {
		return res.render('users/configini', {
			isAuthenticated: req.isAuthenticated(),
			user: req.user
		});
	},

	pinicial: function (req, res, next) {
		if (req.body.contraseñaNew != '123') {
			admon.update(modelo.tbl_usuarios, { doc_identidad: req.res.req.user.doc_identidad }, { contraseña: encriptar(req.body.contraseñaNew) }, function (data) {
				if (data == 'update') {
					return true;
				} else {
					return false;
				}
			});
		} else {
			return 'contraseñaNew';
		}
	},

	firma: function (req, res, next) {
		fs.exists('./firmas', (exists) => {
			if (!exists) {
				fs.mkdir('./firmas', (err) => {
					if (err) throw err;
					fs.writeFile('./firmas/message.png', 'Hello Node.js', (err) => {
						if (err) throw err;
					});
				});
			}
		});

		admon.update(modelo.tbl_usuarios, { doc_identidad: req.res.req.user.doc_identidad }, { firma: req.body.firma }, function (data) {
			if (data == 'update') {
				return true
			} else {
				return false
			}
		});
	},

	cinicial: function (req, res, next) {
		if (req.res.req.user.contraseña != req.body.contraseña_firma) {
			admon.update(modelo.tbl_usuarios, { doc_identidad: req.res.req.user.doc_identidad }, { contraseña_firma: encriptar(req.body.contraseña_firma) }, function (data) {
				if (data == 'update') {
					return true
				} else {
					return false
				}
			});
		} else {
			return 'contraseñaigual';
		}

	},
}; 