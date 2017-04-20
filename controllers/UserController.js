var postgresql = require('pg');

module.exports = {
	getSingUp : function(req, res, next){
		return res.render('users/singup',{
			isAuthenticated : req.isAuthenticated(),
			user : req.user
		});
	}
}; 