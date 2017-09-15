angular.module("iconic").config(routeConfig);

routeConfig.$inject= [
	"$stateProvider",
	"$urlRouterProvider"
]

function routeConfig($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/login");

	$stateProvider 
	.state({
		name: "login",
		templateUrl: 'views/login.html',
		url: "/login",
		controller: "loginCtrl as loginVm",
		params: {
			login: false
		}
	})
	.state({
		name: "verificacion",
		templateUrl: 'views/verificacion.html',
		url: "/verificacion",
		controller: "verificacionCtrl as verificacionVm",
		params: {
			login: true
		}
	})
	.state({
		name: "configini",
		templateUrl: 'views/configini.html',
		url: "/configIni",
		controller: "configiniCtrl as configiniVm",
		params: {
			login: true
		}
	})
	.state({
		name: "menuPrincipal",
		templateUrl: 'views/users/menuPrincipal.html',
		url: "/menuPrincipal",
		controller: "menuPrincipalCtrl as menuPrincipalVm",
		params: {
			login: true
		}
	})
	.state({
		name: "menuPrincipal.AinfoGeneral",
		templateUrl: 'views/users/AinfoGeneral.html',
		url: "/infoGeneral",
		controller: "aInfoGeneralCtrl as infoGeneralVm",
		params: {
			login: true
		}
	})
	.state({
		name: "menuPrincipal.AdocenciaDirecta",
		templateUrl: 'views/users/AdocenciaDirecta.html',
		url: "/docenciaDirecta",
		controller: "aDocenciaDirectaCtrl as docenciaDirectaVm",
		params: { 
			login: true
		}
	})
	.state({
		name: "menuPrincipal.Aextension",
		templateUrl: 'views/users/Aextension.html',
		url: "/extension",
		controller: "aExtensionCtrl as extensionVm",
		params: {
			login: true
		}
	})
	.state({
		name: "menuPrincipal.AcomisionEstudios",
		templateUrl: 'views/users/AcomisionEstudios.html',
		url: "/comisionEstudios",
		controller: "aComisionEstudiosCtrl as comisionEstudiosVm",
		params: {
			login: true
		}
	})
	.state({
		name: "menuPrincipal.Aproyectos",
		templateUrl: 'views/users/Aproyectos.html',
		url: "/proyectosyPublicaciones",
		controller: "aProyectosCtrl as proyectosVm",
		params: {
			login: true
		}
	})
	.state({
		name: "menuPrincipal.Aasesorias",
		templateUrl: 'views/users/Aasesorias.html',
		url: "/asesorias",
		controller: "aAsesoriasCtrl as asesoriasVm",
		params: {
			login: true
		}
	})
	.state({
		name: "menuPrincipal.AotrasActividades",
		templateUrl: 'views/users/AotrasActividades.html',
		url: "/otrasActividades",
		controller: "aOtrasActividadesCtrl as otrasActividadesVm",
		params: {
			login: true
		}
	})
	.state({
		name: "menuPrincipal.AinvestigacionesS",
		templateUrl: 'views/users/AinvestigacionesS.html',
		url: "/investigacionesSemilleros",
		controller: "aInvestigacionesSCtrl as investigacionesSVm",
		params: {
			login: true
		}
	})
	.state({
		name: "menuPrincipal.AinvestigacionesP",
		templateUrl: 'views/users/AinvestigacionesP.html',
		url: "/investigacionesProyectos",
		controller: "aInvestigacionesPCtrl as investigacionesPVm",
		params: {
			login: true
		}
	})
	.state({
		name: "menuPrincipal.Aobservaciones",
		templateUrl: 'views/users/Aobservaciones.html',
		url: "/observaciones",
		controller: "aObservacionesCtrl as observacionesVm",
		params: {
			login: true
		}
	})
	.state({
		name: "menuPrincipal.vistaPTD",
		templateUrl: 'views/users/vistaPTD.html',
		url: "/vistaPTD",
		params: {
			login: true
		}
	})
}
