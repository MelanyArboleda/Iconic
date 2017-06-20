var express = require('express');
var router = express.Router();
var passport = require('passport');
var controllers = require('.././controllers');
var AuthMiddleware = require('../passport/passport').authenticate;
var inicial = require('.././database/inicial');

// router.get('/auth/programs', controllers.UserController.test);
router.get('/', controllers.HomeController.index);
router.post('/auth/login', controllers.UserController.login);
router.post('/auth/sendCode', controllers.UserController.sendVerificationCode);
// router.get('/auth/recu/*', controllers.UserController.recup);
router.post('/auth/send', controllers.MailController.restablecer);
router.post('/auth/recu', controllers.UserController.nueva);
router.post('/auth/actic', controllers.UserController.cambio);
router.post('/auth/configp', controllers.UserController.pinicial);
router.post('/auth/configf', controllers.UserController.firma);
router.post('/auth/configc', controllers.UserController.cinicial);


module.exports = router;