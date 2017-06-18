var express = require('express');
var router = express.Router();
var passport = require('passport');
var controllers = require('.././controllers');
var AuthMiddleware = require('../passport/passport').authenticate;
var inicial = require('.././database/inicial');

router.get('/auth/programs', controllers.UserController.test);
router.get('/', controllers.HomeController.index);
router.post('/auth/login', controllers.UserController.login );
router.get('/auth/singup', AuthMiddleware, controllers.UserController.test);
router.get('/auth/logout', controllers.UserController.logout);
router.post('/auth/index', passport.authenticate('local', {
	successRedirect: '/auth/singup',// si es login comun siga si no mande a /auth/acti
	failureRedirect: '/'
}));

router.post('/auth/sendCode', controllers.UserController.sendVerificationCode);

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