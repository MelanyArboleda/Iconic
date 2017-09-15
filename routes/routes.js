const express = require('express');
const router = express.Router();
const passport = require('passport');
const controllers = require('.././controllers');
const modelos = require('.././database');
const AuthMiddleware = require('../passport/passport').authenticate;
const inicial = require('.././database/inicial');

router.get('/', controllers.HomeController.index);
router.post('/auth/login', controllers.UserController.login);
router.post('/auth/sendCode', controllers.UserController.sendVerificationCode);
router.post('/auth/buscarUser', controllers.UserController.buscarUsuario);
router.post('/auth/buscarArea', controllers.PtdController.buscarArea);
router.post('/auth/buscarDedicacion', controllers.PtdController.buscarDedicacion);

// router.get('/auth/recu/*', controllers.UserController.recup);
router.post('/auth/send', controllers.MailController.restablecer);
router.post('/auth/recu', controllers.UserController.nueva);
router.post('/auth/actic', controllers.UserController.cambio);
router.post('/auth/configp', controllers.UserController.pinicial);
router.post('/auth/configf', controllers.UserController.firma);
router.post('/auth/configc', controllers.UserController.cinicial);
//rutas del ptd
router.post('/auth/createPtd', modelos.tbl_ptds.crear_ptd);
router.post('/auth/buscarPtd', modelos.tbl_ptds.buscar_ptd);
router.post('/auth/guardarPtd', modelos.tbl_ptds.guardar_ptd);
//rutas de docencia directa
router.post('/auth/buscarDD', modelos.tbl_docencias_directas.buscar_DD);
router.post('/auth/guardarDD', modelos.tbl_docencias_directas.guardar_DD);
//rutas de investigaciones de semillero
router.post('/auth/buscarIS', modelos.tbl_investigaciones_semilleros.buscar_IS);
router.post('/auth/guardarIS', modelos.tbl_investigaciones_semilleros.guardar_IS);
//rutas de investigaciones de proyectos
router.post('/auth/buscarIP', modelos.tbl_investigaciones_proyectos.buscar_IP);
router.post('/auth/guardarIP', modelos.tbl_investigaciones_proyectos.guardar_IP);
//rutas de actividades de extension
router.post('/auth/buscarAE', modelos.tbl_actividades_extension.buscar_AE);
router.post('/auth/guardarAE', modelos.tbl_actividades_extension.guardar_AE);
//rutas de comision de estudios
router.post('/auth/buscarCE', modelos.tbl_comision_estudios.buscar_CE);
router.post('/auth/guardarCE', modelos.tbl_comision_estudios.guardar_CE);
//rutas de formulacion de proyectos
router.post('/auth/buscarFP', modelos.tbl_formulacion_proyectos.buscar_FP);
router.post('/auth/guardarFP', modelos.tbl_formulacion_proyectos.guardar_FP);
//rutas de asesoria de proyectos
router.post('/auth/buscarAP', modelos.tbl_asesoria_proyectos.buscar_AP);
router.post('/auth/guardarAP', modelos.tbl_asesoria_proyectos.guardar_AP);
//rutas de actividades
router.post('/auth/buscarActividades', modelos.tbl_actividades.buscar_actividades);
router.post('/auth/guardarActividades', modelos.tbl_actividades.guardar_actividades);
//rutas de resumenes
router.post('/auth/buscarRG', modelos.tbl_resumenes.buscar_RG);
router.post('/auth/guardarRG', modelos.tbl_resumenes.guardar_RG);
//rutas de observaciones
router.post('/auth/buscarObservaciones', modelos.tbl_observaciones.buscar_observaciones);
router.post('/auth/guardarObservaciones', modelos.tbl_observaciones.guardar_observaciones);
//rutas de seguimiento y evaluacion
router.post('/auth/buscarSE', modelos.tbl_seguimientos_evaluacion.buscar_SE);
router.post('/auth/guardarSE', modelos.tbl_seguimientos_evaluacion.guardar_SE);

module.exports = router;