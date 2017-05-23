var nodemailer = require('nodemailer');
var admon = require('.././database/admon');
var modelo = require('.././database/modelos');
fs = require('fs');
var html = (fs.readFileSync("./views/correo.html")).toString();
module.exports = {

	enviar : function (req, res) {
		var dato = [{
			correo: req.body.email
		}];
		admon.findAll(modelo.tbl_usuarios, dato, function(data) {
			if (data !== undefined) {
				var id = data.id.toString();
				var nombre = data.nombre;

				for (var i = 0; i < 4; i++) {
					var b = new Buffer(id);
					var id = b.toString('base64');
				}

				let transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: 'gabotolosa97@gmail.com',
						pass: 'tolosa123'
					}
				});

				var date = new Date();
				var fecha = date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate();
				var dateEnt = new Buffer(fecha);
				fecha = dateEnt.toString('base64');
				html = html.replace("url", "http://localhost:3000/auth/recu/"+id+"/"+fecha);
				html = html.replace("Usuario", ""+nombre);

				let mailOptions = {
					from: '"no-reply@elpoli.edu.co" <gabotolosa97@gmail.com>',
					to: req.body.email,
					subject: 'Restablecer contraseña',
					html:html
				};

				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						return console.log(error);
					}
					var datos = {
					 	tblUsuarioId: data.id,
					 	recuperar: 1
					};
					var donde = {
						tblUsuarioId: data.id
					}
					admon.findOrCreate(modelo.tbl_recuperaciones, datos,donde,function (data) {
						if (!data) {
							admon.update(modelo.tbl_recuperaciones, donde, datos, function(data) {});
						}
					});
					return res.redirect('/');
				});
			}else{
				console.log('no se encontro el correo');
				return res.redirect('/');
			}
		});
	}
};