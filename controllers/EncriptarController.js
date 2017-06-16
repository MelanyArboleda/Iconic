var bcrypt = require('bcryptjs');
//la funcion encripta cualquier dato que llegue y lo retorna
function encriptar(clave) {
	var salt = bcrypt.genSaltSync(10);
	var password = bcrypt.hashSync(clave, salt);
	return password;
}
module.exports = encriptar;