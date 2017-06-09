var express = require('express');
var router = express.Router();
var passport = require('passport');
var controllers = require('.././controllers');
var AuthMiddleware = require('.././middleware/auth');
var inicial = require('.././database/inicial');

router.get('/', AuthMiddleware.isLoggedInd, controllers.HomeController.index);
router.get('/auth/singup', AuthMiddleware.isLogged, controllers.UserController.getSingUp);
router.post('/auth/index', passport.authenticate('local',{
	successRedirect: '/auth/singup',
	failureRedirect: '/'
}));	
router.get('/auth/logout',controllers.UserController.logout);
router.post('/auth/send',controllers.MailController.enviar);

router.get('/auth/recu/*', AuthMiddleware.isLoggedInd, controllers.UserController.recup);
router.post('/auth/recu', AuthMiddleware.isLoggedInd, controllers.UserController.nueva);

module.exports = router;