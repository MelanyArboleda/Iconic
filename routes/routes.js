var express = require('express');
var router = express.Router();
var passport = require('passport');
var controllers = require('.././controllers');


router.get('/', controllers.HomeController.index);


router.get('/auth/singup', controllers.UserController.getSingUp);
router.post('/auth/index', passport.authenticate('local',{
	successRedirect: '/auth/singup',
	failureRedirect: '/',
	failureFlash: true
}));

//app.get('/myRoute', function(request, response) {
//    response.sendFile( 'index.html'); 
//});


module.exports = router;
