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
			login: false
		}
	})
	.state({
		name: "configini",
		templateUrl: 'views/configini.html',
		url: "/configIni",
		params: {
			login: false
		}
	})
	.state({
		name: "menuPrincipal",
		templateUrl: 'views/users/menuPrincipal.html',
		url: "/menuPrincipal",
		params: {
			login: true
		}
	})
	.state({
		name: "menuPrincipal.AinfoGeneral",
		templateUrl: 'views/users/AinfoGeneral.html',
		url: "/infoGeneral",
		params: {
			login: true
		}
	})
	.state({
		name: "menuPrincipal.AdocenciaDirecta",
		templateUrl: 'views/users/AdocenciaDirecta.html',
		url: "/docenciaDirecta",
		params: {
			login: true
		}
	})
	.state({
		name: "menuPrincipal.Aextension",
		templateUrl: 'views/users/Aextension.html',
		url: "/extension",
		params: {
			login: true
		}
	})
	.state({
		name: "menuPrincipal.AcomisionEstudios",
		templateUrl: 'views/users/AcomisionEstudios.html',
		url: "/comisionEstudios",
		params: {
			login: true
		}
	})
	.state({
		name: "menuPrincipal.Aproyectos",
		templateUrl: 'views/users/Aproyectos.html',
		url: "/proyectosyPublicaciones",
		params: {
			login: true
		}
	})
	.state({
		name: "menuPrincipal.Aasesorias",
		templateUrl: 'views/users/Aasesorias.html',
		url: "/asesorias",
		params: {
			login: true
		}
	})
	.state({
		name: "menuPrincipal.AotrasActividades",
		templateUrl: 'views/users/AotrasActividades.html',
		url: "/otrasActividades",
		params: {
			login: true
		}
	})
	.state({
		name: "menuPrincipal.Ainvestigaciones",
		templateUrl: 'views/users/Ainvestigaciones.html',
		url: "/investigaciones",
		params: {
			login: true
		}
	})
	.state({
		name: "menuPrincipal.Aobservaciones",
		templateUrl: 'views/users/Aobservaciones.html',
		url: "/observaciones",
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
