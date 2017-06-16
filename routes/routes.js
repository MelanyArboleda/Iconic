var express = require('express');
var router = express.Router();
var passport = require('passport');
var controllers = require('.././controllers');
var AuthMiddleware = require('.././middleware/auth');
var inicial = require('.././database/inicial');

router.get('/', AuthMiddleware.isLoggedInd, controllers.HomeController.index);
router.get('/auth/singup', AuthMiddleware.isLogged, controllers.UserController.getSingUp);
router.get('/auth/logout', controllers.UserController.logout);
router.post('/auth/index', passport.authenticate('local', {
	successRedirect: '/auth/singup',// si es login comun siga si no mande a /auth/acti
	failureRedirect: '/'
}));


router.get('/auth/recu/*', controllers.UserController.recup);
router.post('/auth/send', controllers.MailController.restablecer);
router.post('/auth/recu', controllers.UserController.nueva);

router.get('/auth/acti', controllers.UserController.activacion);
router.post('/auth/actic', controllers.UserController.cambio);

router.get('/auth/config', controllers.UserController.configuracion);
router.post('/auth/configp', controllers.UserController.pinicial);
router.post('/auth/configf', controllers.UserController.firma);
router.post('/auth/configc', controllers.UserController.cinicial);







module.exports = router;