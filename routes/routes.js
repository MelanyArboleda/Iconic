const express = require('express');
const router = express.Router();
const passport = require('passport');
const controllers = require('.././controllers');
const modelos = require('.././database');
const AuthMiddleware = require('../passport/passport').authenticate;
const inicial = require('.././database/inicial');

//ruta de index
router.get('/', controllers.HomeController.index);
//ruta del login
router.post('/auth/login', controllers.UserController.login);
//enviar codigo para la verificacion de 2 paso del login
router.post('/auth/sendCode', controllers.UserController.send_Code);
//busca el usuario para saber si esta logeado
router.post('/auth/buscarUser', controllers.UserController.buscar_User);
//busca el usuario para usar su informacion
//router.post('/auth/buscarUsuario', controllers.UserController.buscar_Usuario);
//validar codigo para activar cuanta
router.post('/auth/validarCode', controllers.UserController.validar_Code);
//cambiar estado del usuario
router.post('/auth/cambiarEstado', controllers.UserController.cambiar_Estado);
//enviar correo con el link de restablecer contraseña
router.post('/auth/sendLink', controllers.MailController.sendLink);
//ruta de restablecimiento de contraseña
router.post('/auth/validarDatos', controllers.UserController.validar_datos);
//comparador de contraseñas
router.post('/auth/validarPassword', controllers.UserController.validar_password);
//guardar firma
router.post('/auth/guardarFirma', controllers.UserController.guardar_Firma);
//guardar comentario concertacion
router.post('/auth/guardarConcertacion', modelos.tbl_concertaciones.guardar_Concertacion);


router.post('/auth/configc', controllers.UserController.cinicial);
///////////////////////////////////////////////////////////////////////////////////////////////////
//rutas del ptd
router.post('/auth/createPtd', modelos.tbl_ptds.crear_Ptd);
router.post('/auth/buscarPtd', modelos.tbl_ptds.buscar_Ptd);
router.post('/auth/buscarPtdsFacultad', modelos.tbl_ptds.buscar_Ptds_Facultad);
router.post('/auth/buscarPtdsPrograma', modelos.tbl_ptds.buscar_Ptds_Programa);
router.post('/auth/buscarPtds', modelos.tbl_ptds.buscar_Ptds);
router.post('/auth/buscarPtdsUser', modelos.tbl_ptds.buscar_Ptds_User);
router.post('/auth/guardarPtd', modelos.tbl_ptds.guardar_Ptd);
//rutas de docencia directa
router.post('/auth/buscarDD', modelos.tbl_docencias_directas.buscar_DD);
router.post('/auth/guardarDD', modelos.tbl_docencias_directas.guardar_DD);
router.post('/auth/modificarDD', modelos.tbl_docencias_directas.modificar_DD);
router.post('/auth/eliminarDD', modelos.tbl_docencias_directas.eliminar_DD);
//rutas de investigaciones de semillero
router.post('/auth/buscarIS', modelos.tbl_investigaciones_semilleros.buscar_IS);
router.post('/auth/guardarIS', modelos.tbl_investigaciones_semilleros.guardar_IS);
router.post('/auth/modificarIS', modelos.tbl_investigaciones_semilleros.modificar_IS);
router.post('/auth/eliminarIS', modelos.tbl_investigaciones_semilleros.eliminar_IS);
//rutas de investigaciones de proyectos
router.post('/auth/buscarIP', modelos.tbl_investigaciones_proyectos.buscar_IP);
router.post('/auth/guardarIP', modelos.tbl_investigaciones_proyectos.guardar_IP);
router.post('/auth/modificarIP', modelos.tbl_investigaciones_proyectos.modificar_IP);
router.post('/auth/eliminarIP', modelos.tbl_investigaciones_proyectos.eliminar_IP);
//rutas de actividades de extension
router.post('/auth/buscarAE', modelos.tbl_actividades_extension.buscar_AE);
router.post('/auth/guardarAE', modelos.tbl_actividades_extension.guardar_AE);
router.post('/auth/modificarAE', modelos.tbl_actividades_extension.modificar_AE);
router.post('/auth/eliminarAE', modelos.tbl_actividades_extension.eliminar_AE);
//rutas de comision de estudios
router.post('/auth/buscarCE', modelos.tbl_comision_estudios.buscar_CE);
router.post('/auth/guardarCE', modelos.tbl_comision_estudios.guardar_CE);
router.post('/auth/modificarCE', modelos.tbl_comision_estudios.modificar_CE);
router.post('/auth/eliminarCE', modelos.tbl_comision_estudios.eliminar_CE);
//rutas de formulacion de proyectos
router.post('/auth/buscarFP', modelos.tbl_formulacion_proyectos.buscar_FP);
router.post('/auth/guardarFP', modelos.tbl_formulacion_proyectos.guardar_FP);
router.post('/auth/modificarFP', modelos.tbl_formulacion_proyectos.modificar_FP);
router.post('/auth/eliminarFP', modelos.tbl_formulacion_proyectos.eliminar_FP);
//rutas de asesoria de proyectos
router.post('/auth/buscarAP', modelos.tbl_asesoria_proyectos.buscar_AP);
router.post('/auth/guardarAP', modelos.tbl_asesoria_proyectos.guardar_AP);
router.post('/auth/modificarAP', modelos.tbl_asesoria_proyectos.modificar_AP);
router.post('/auth/eliminarAP', modelos.tbl_asesoria_proyectos.eliminar_AP);
//rutas de resumenes generales
router.post('/auth/buscarRG', modelos.tbl_resumenes.buscar_RG);
router.post('/auth/crearRG', modelos.tbl_resumenes.crear_RG);
router.post('/auth/modificarRG', modelos.tbl_resumenes.modificar_RG);
//rutas de actividades
router.post('/auth/buscarOA', modelos.tbl_actividades.buscar_OA);
router.post('/auth/guardarOA', modelos.tbl_actividades.guardar_OA);
router.post('/auth/modificarOA', modelos.tbl_actividades.modificar_OA);
router.post('/auth/eliminarOA', modelos.tbl_actividades.eliminar_OA);
//rutas de observaciones
router.post('/auth/buscarObservaciones', modelos.tbl_observaciones.buscar_Observaciones);
router.post('/auth/crearObservaciones', modelos.tbl_observaciones.crear_Observaciones);
router.post('/auth/guardarObservaciones', modelos.tbl_observaciones.guardar_Observaciones);
router.post('/auth/guardarFirmaObservaciones', modelos.tbl_observaciones.guardar_Firma_Observaciones);
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//rutas de seguimiento y evaluacion
router.post('/auth/buscarSE', modelos.tbl_seguimientos_evaluacion.buscar_SE);
router.post('/auth/guardarSE', modelos.tbl_seguimientos_evaluacion.guardar_SE);
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//rutas de los permisos
router.post('/auth/buscarPermisos', controllers.PtdController.buscar_Permisos);
router.post('/auth/guardarPermisos', controllers.PtdController.guardar_Permisos);
//obtener datos espesifico
router.post('/auth/buscarPerfil', controllers.PtdController.buscar_Perfil);
router.post('/auth/buscarPrograma', controllers.PtdController.buscar_Programa);
router.post('/auth/buscarMaterias', controllers.PtdController.buscar_Materias);
router.post('/auth/buscarArea', controllers.PtdController.buscar_Area);
router.post('/auth/buscarFacultad', controllers.PtdController.buscar_Facultad);
router.post('/auth/buscarEtapa', controllers.PtdController.buscar_Etapa);
router.post('/auth/buscarActor', controllers.PtdController.buscar_Actor);
router.post('/auth/buscarProgramaMateria', controllers.PtdController.buscar_Programa_Materia);
router.post('/auth/buscarVinculosP', modelos.tbl_vinculos.buscar_VinculosP);
router.post('/auth/buscarVinculosS', modelos.tbl_vinculos.buscar_VinculosS);
//rutas de fechas para las etapas
router.post('/auth/buscarFechaEtapa', modelos.tbl_fechas_etapas.buscar_FechaEtapa);
router.post('/auth/guardarFechaEtapa', modelos.tbl_fechas_etapas.guardar_FechaEtapa);
router.post('/auth/modificarFechaEtapa', modelos.tbl_fechas_etapas.modificar_FechaEtapa);
router.post('/auth/eliminarFechaEtapa', modelos.tbl_fechas_etapas.eliminar_FechaEtapa);
//rutas de los usuarios para los permisos
router.post('/auth/buscarUsuarios', controllers.UserController.buscar_Usuarios);
router.post('/auth/buscarEstados', controllers.UserController.buscar_Estados);
router.post('/auth/buscarPerfiles', controllers.UserController.buscar_Perfiles);
router.post('/auth/modificarUsuario', controllers.UserController.modificar_Usuario);
router.post('/auth/modificarPermiso', controllers.UserController.modificar_Permiso);
router.post('/auth/buscarRecursos', controllers.UserController.buscar_Recursos);

module.exports = router;