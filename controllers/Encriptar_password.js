var bcrypt = require('bcryptjs');
function encriptar(clave) {
	var salt = bcrypt.genSaltSync(10);
	var password = bcrypt.hashSync(clave, salt);
	return password;
}

module.exports = encriptar;