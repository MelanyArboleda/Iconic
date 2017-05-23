module.exports = {
	isLogged : function (req, res, next) {	
		if (req.isAuthenticated()) {
			next();
		}else{
			res.redirect('/');
		}		
	},
	isLoggedInd : function (req, res, next){
		if(req.params[0] != "/auth/singup"){
			if (req.isAuthenticated()) {
				res.redirect('/auth/singup');
			}else{
				next();
			}
		}
	}
}