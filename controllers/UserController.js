var encriptar = require('.././controllers/Encriptar_password');
var admon = require('.././database/admon');
var modelo = require('.././database/modelos');
var user;
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
		var idin = req.params[0];
		idin = idin.split("/");
		user = idin[0];
		var fecha = new Buffer(idin[1], 'base64');
		fecha = fecha.toString();
		var date = new Date();
		var fecha_act = date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate();
		for (var i = 0; i < 4; i++) {
			b = new Buffer(user, 'base64')
			user = b.toString();
		}
		var dato = [{
			id: user
		}];
		admon.findAll(modelo.tbl_usuarios, dato, function(data) {
			if (data !== undefined) {
				if (fecha >= fecha_act){
					var dato = [{
						tblUsuarioId: user
					}];
					admon.findAll(modelo.tbl_recuperaciones, dato, function(data) {
						if (data.recuperar == 1) {
							res.render('users/recu');
						}else{
							res.redirect('/');
						}
		 			});	
		 		}else{
		 			res.redirect('/');
		 		}
			}else{
				console.log(err);
		 		res.redirect('/');
			}
		});
	},

	nueva : function(req, res, next){
		var password = {
			contraseña: encriptar(req.body.clave),
		};
		var dato = [{
			id: user
		}];
		admon.update(modelo.tbl_usuarios, dato, password, function(data) {
			if (data == 'update') {
				var dato = [{
					tblUsuarioId: user
				}];
				var datos ={
					recuperar: 0
				};
				admon.update(modelo.tbl_recuperaciones, dato, datos, function(data) {});
				res.redirect('/');
			}
		});
	}
}; 