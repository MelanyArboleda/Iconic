var postgresql = require('pg');

module.exports = {
	getSingUp : function(req, res, next){
		return res.render('users/singup');
	}
}; 