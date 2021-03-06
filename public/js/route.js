angular.module("iconic").config(routeConfig);

routeConfig.$inject = [
	"$stateProvider",
	"$urlRouterProvider"
]

function routeConfig($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/login");

	$stateProvider
		.state({
			name: "login",
			templateUrl: 'views/login.html',
			url: "/login",
			controller: "loginCtrl as loginVm",
			recurso: 0,
			params: {
				login: false
			}
		})
		.state({
			name: "verificacion",
			templateUrl: 'views/verificacion.html',
			url: "/verificacion",
			controller: "verificacionCtrl as verificacionVm",
			recurso: 0,
			params: {
				login: true
			}
		})
		.state({
			name: "configini",
			templateUrl: 'views/configini.html',
			url: "/configIni",
			controller: "configiniCtrl as configiniVm",
			recurso: 0,
			params: {
				login: true
			}
		})
		.state({
			name: "restablecer",
			templateUrl: 'views/restablecer.html',
			url: "/restablecer/:id/:fecha",
			controller: "restablecerCtrl as restablecerVm",
			recurso: 0,
			params: {
				login: false
			}
		})
		.state({
			name: "menuPrincipal",
			templateUrl: 'views/users/menuPrincipal.html',
			url: "/menuPrincipal",
			controller: "menuPrincipalCtrl as menuPrincipalVm",
			recurso: 0,
			params: {
				login: true
			}
		})
		.state({
			name: "menuPrincipal.fechaEtapa",
			templateUrl: 'views/users/FechaEtapa.html',
			url: "/fechaEtapa",
			controller: "fechaEtapaCtrl as fechaEtapaVm",
			recurso: 0,
			params: {
				login: true
			}
		})
		.state({
			name: "menuPrincipal.AinfoGeneral",
			templateUrl: 'views/users/AinfoGeneral.html',
			url: "/infoGeneral",
			controller: "aInfoGeneralCtrl as infoGeneralVm",
			recurso: 0,
			params: {
				login: true
			}
		})
		.state({
			name: "menuPrincipal.AdocenciaDirecta",
			templateUrl: 'views/users/AdocenciaDirecta.html',
			url: "/docenciaDirecta/:idPlanDeTrabajo",
			controller: "aDocenciaDirectaCtrl as docenciaDirectaVm",
			recurso: 1,
			params: {
				login: true
			}
		})
		.state({
			name: "menuPrincipal.AinvestigacionesS",
			templateUrl: 'views/users/AinvestigacionesS.html',
			url: "/investigacionesSemilleros/:idPlanDeTrabajo",
			controller: "aInvestigacionesSCtrl as investigacionesSVm",
			recurso: 2,
			params: {
				login: true
			}
		})
		.state({
			name: "menuPrincipal.AinvestigacionesP",
			templateUrl: 'views/users/AinvestigacionesP.html',
			url: "/investigacionesProyectos/:idPlanDeTrabajo",
			controller: "aInvestigacionesPCtrl as investigacionesPVm",
			recurso: 2,
			params: {
				login: true
			}
		})
		.state({
			name: "menuPrincipal.Aextension",
			templateUrl: 'views/users/Aextension.html',
			url: "/extension/:idPlanDeTrabajo",
			controller: "aExtensionCtrl as extensionVm",
			recurso: 3,
			params: {
				login: true
			}
		})
		.state({
			name: "menuPrincipal.AcomisionEstudios",
			templateUrl: 'views/users/AcomisionEstudios.html',
			url: "/comisionEstudios/:idPlanDeTrabajo",
			controller: "aComisionEstudiosCtrl as comisionEstudiosVm",
			recurso: 4,
			params: {
				login: true
			}
		})
		.state({
			name: "menuPrincipal.Aproyectos",
			templateUrl: 'views/users/Aproyectos.html',
			url: "/proyectosyPublicaciones/:idPlanDeTrabajo",
			controller: "aProyectosCtrl as proyectosVm",
			recurso: 5,
			params: {
				login: true
			}
		})
		.state({
			name: "menuPrincipal.Aasesorias",
			templateUrl: 'views/users/Aasesorias.html',
			url: "/asesorias/:idPlanDeTrabajo",
			controller: "aAsesoriasCtrl as asesoriasVm",
			recurso: 6,
			params: {
				login: true
			}
		})
		.state({
			name: "menuPrincipal.AotrasActividades",
			templateUrl: 'views/users/AotrasActividades.html',
			url: "/otrasActividades/:idPlanDeTrabajo",
			controller: "aOtrasActividadesCtrl as otrasActividadesVm",
			recurso: 7,
			params: {
				login: true
			}
		})
		.state({
			name: "menuPrincipal.ResumenGeneral",
			templateUrl: 'views/users/ResumenGeneral.html',
			url: "/ResumenGeneral/:idPlanDeTrabajo",
			controller: "aOtrasActividadesCtrl as otrasActividadesVm",
			recurso: 17,
			params: {
				login: true
			}
		})
		.state({
			name: "menuPrincipal.Aobservaciones",
			templateUrl: 'views/users/Aobservaciones.html',
			url: "/observaciones/:idPlanDeTrabajo",
			controller: "aObservacionesCtrl as observacionesVm",
			recurso: 8,
			params: {
				login: true
			}
		})
		.state({
			name: "menuPrincipal.vistaPTD",
			templateUrl: 'views/users/vistaPTD.html',
			url: "/vistaPTD",
			recurso: 0,
			params: {
				login: true
			}
		})
		.state({
			name: "menuPrincipal.Usuarios",
			templateUrl: 'views/users/Usuarios.html',
			url: "/Usuarios",
			controller: "usuariosCtrl as usuariosVm",
			recurso: 15,
			params: {
				login: true
			}
		})
		.state({
			name: "menuPrincipal.SeguimientoEvaluacion",
			templateUrl: 'views/users/seguimientoEvaluacion.html',
			url: "/SeguimientoEvaluacion",
			controller: "SeguimientoEvaluacionCtrl as SeguimientoEvaluacionVm",
			recurso: 9,
			params: {
				login: true
			}
		})
		.state({
			name: "menuPrincipal.Reportes",
			templateUrl: 'views/users/Reportes.html',
			url: "/Reportes",
			controller: "ReportesCtrl as ReportesVm",
			recurso: 18,
			params: {
				login: true
			}
		})
}
