var express = require('express');
var router = express.Router();
var controllers = require('.././controllers');


router.get('/', controllers.HomeController.index);

router.get('/auth/singup', controllers.UserController.getSingUp);

//app.get('/myRoute', function(request, response) {
//    response.sendFile( 'index.html'); 
//});


module.exports = router;
