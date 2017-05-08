var nodemailer = require('nodemailer');
var postgresql = require('pg').Pool;

module.exports = {

	enviar : function (req, res) {
		var config = require('.././database/config');
		var pool = new postgresql(config);
		pool.query('SELECT * FROM tbl_usuarios WHERE correo = $1', [req.body.email], function(err, result){
			if (err) throw err;

			if (result.rows.length > 0) {
				var user = result.rows[0];
				var id = user.id.toString();
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
				
				let mailOptions = {
				    from: '"Gabriel" <gabotolosa97@gmail.com>',
				    to: req.body.email,
				    subject: 'Recuperar Contraseña',
				    text: 'http://localhost:3000/auth/recu/'+id,
				};

				transporter.sendMail(mailOptions, (error, info) => {
				    if (error) {
				        return console.log(error);
				    }
				   	return res.redirect('/');
				});

			}else{
				console.log('no se encontro el correo');
				return res.redirect('/');
			} 
		});
		
	}
};