angular.module("iconic").factory("loginFactory", loginFactory);

loginFactory.$inject = ["$rootScope","loginService", "ptdFactory", "$state", "serviceNotification", "$q", "localStorageService"];

function loginFactory($rootScope, loginService, ptdFactory, $state, serviceNotification, $q, localStorageService) {

	var factory = {
		user: {},
		perfil: {},
		estatus: {},
		buscarPerfil: buscarPerfil,
		cargarEstatus: cargarEstatus,
		login: login,
		logout: logout,
		userLogin: false,
		isLogin: isLogin,
		sendCode: sendCode,
		cambiarEstado: cambiarEstado,
		sendLink: sendLink,
		codigoVerificacion: null
	};
	return factory;

	function login(user) {
		var deferred = $q.defer();

		loginService.login(user).then(function (result) {
			factory.user = result.user;
			factory.userLogin = true;
			localStorageService.set("loginToken", result.token);
			deferred.resolve(factory.userLogin);
			//serviceNotification.success("Bienvenido a ICONIC", 2000);
		}).catch(function (err) {
			deferred.reject(err);
			if (err.data.estado != 2) {
				serviceNotification.error("Ingresa los datos correctamente", 2000);
			} else {
				serviceNotification.warning("Cuenta inactiva", 2000);
			}
		});

		return deferred.promise;
	}

	function logout() {
		factory.user = {};
		ptdFactory.ptd = {};
		localStorageService.remove("loginToken");
		$rootScope.infoReady = false;
		$rootScope.urlReady = false;
		$state.go("login");
		factory.userLogin = false;
	}

	function isLogin() {
		var deferred = $q.defer();
		var token = localStorageService.get("loginToken");
		if (token) {
			loginService.buscarUser({ token: token }).then(function (user) {
				factory.user = user.user;
				factory.userLogin = true;
				deferred.resolve();
			});
		} else {
			deferred.resolve();
		}
		return deferred.promise;
	}

	function sendCode() {
		var deferred = $q.defer();
		loginService.sendCode(factory.user).then(function (codigoVerificacion) {
			factory.codigoVerificacion = codigoVerificacion;
			deferred.resolve(true);
		}).catch(function (err) {
			deferred.reject(err);
			serviceNotification.error("El código verificacion no pudo ser enviado", 2000);
			logout();
		});
		return deferred.promise;
	}

	function cambiarEstado() {
		var data = {
			doc_identidad: factory.user.doc_identidad,
			tblEstadoId: 3
		};
		var deferred = $q.defer();
		loginService.cambiarEstado(data).then(function (result) {
			factory.user = result.user;
			deferred.resolve();
		}).catch(function (err) { });
		return deferred.promise;
	}

	function sendLink(correo) {
		if(correo.correo != ""){
			loginService.sendLink(correo).then(function (resp) {
				//envio el correo
				serviceNotification.success('Se envio un link a su correo para el restablecimiento de su cuenta', 3000);
			}).catch(function (err) {
				//no se pudo enviar el correo
				if (err.status == 404) {
					serviceNotification.error("El usuario no exitente en el sistema", 2000);
				}
				if (err.status == 400) {
					serviceNotification.warning("El correo ya ha sido enviado anteriomente", 2000);
				}
				if (err.status == 403) {
					serviceNotification.error("El usuario no se encuantra activo en el sistema", 2000);
				}
				if (err.status == 500) {
					serviceNotification.error("El correo no pudo ser enviado", 2000);
				}
			});
		}
	}

	function cargarEstatus() {
		var deferred = $q.defer();
		buscarPerfil().then(function () {
			buscarPrograma().then(function () {
				buscarArea().then(function () {
					buscarFacultad().then(function () {
						buscarEtapa().then(function () {
							buscarPermisos().then(function () {
								deferred.resolve();
							});
						});
					});
				})
			});
		});
		return deferred.promise;
	}

	function buscarPerfil() {
		var deferred = $q.defer();
		loginService.buscarPerfil({ id: factory.user.perfil }).then(function (perfil) {
			factory.perfil = perfil;
			deferred.resolve();
		});
		return deferred.promise;
	}

	function buscarPrograma() {
		var deferred = $q.defer();
		loginService.buscarPrograma({ doc_identidad: factory.user.doc_identidad }).then(function (programa) {
			factory.estatus.programa = programa;
			deferred.resolve();
		});
		return deferred.promise;
	}

	function buscarArea() {
		var deferred = $q.defer();
		loginService.buscarArea({ id: factory.estatus.programa.tblAreaId }).then(function (area) {
			factory.estatus.area = area;
			deferred.resolve();
		});
		return deferred.promise;
	}

	function buscarFacultad() {
		var deferred = $q.defer();
		loginService.buscarFacultad({ id: factory.estatus.area.tblFacultadeId }).then(function (facultad) {
			factory.estatus.facultad = facultad;
			deferred.resolve();
		});
		return deferred.promise;
	}

	function buscarEtapa() {
		var deferred = $q.defer();
		loginService.buscarEtapa().then(function (etapa) {
			factory.estatus.etapa = etapa;
			deferred.resolve();
		});
		return deferred.promise;
	}

	function buscarPermisos() {
		var deferred = $q.defer();
		loginService.buscarPermisos({ tblUsuarioDocIdentidad: factory.user.doc_identidad }).then(function (permisos) {
			factory.estatus.permisos = permisos;
			deferred.resolve();
		});
		return deferred.promise;
	}

}