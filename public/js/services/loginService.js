angular.module("iconic").service("loginService", loginService);

loginService.$inject = ["$http", "$q", "APP_CONSTANT"];

function loginService($http, $q, appConstant) {
	//defino métodos que va a tener el servicio
	this.login = login;
	this.buscarPerfil = buscarPerfil;
	this.buscarPrograma = buscarPrograma;
	this.buscarArea = buscarArea;
	this.buscarFacultad = buscarFacultad;
	this.buscarEtapa = buscarEtapa;
	this.buscarPermisos = buscarPermisos;
	this.guardarPermisos = guardarPermisos;
	this.sendCode = sendCode;
	this.validarCode = validarCode;
	this.compararcontraseñas = compararcontraseñas;
	this.buscarUser = buscarUser;
	this.cambiarEstado = cambiarEstado;
	this.sendLink = sendLink;
	this.validarDatos = validarDatos;
	this.guardarFirma = guardarFirma;


	function login(user) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/login", user).then(function (res) {
			deferred.resolve(res.data);
		}, function (err) {
			deferred.reject(err);
			console.log(err);
		});

		return deferred.promise;
	}

	function buscarPerfil(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/buscarPerfil", data).then(function (res) {
			deferred.resolve(res.data);
		}, function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

	function buscarPrograma(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/buscarPrograma", data).then(function (res) {
			deferred.resolve(res.data);
		}, function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

	function buscarArea(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/buscarArea", data).then(function (res) {
			deferred.resolve(res.data);
		}, function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

	function buscarFacultad(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/buscarFacultad", data).then(function (res) {
			deferred.resolve(res.data);
		}, function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

	function buscarEtapa() {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/buscarEtapa").then(function (res) {
			deferred.resolve(res.data);
		}, function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

	function buscarPermisos(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/buscarPermisos", data).then(function (res) {
			deferred.resolve(res.data);
		}, function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

	function guardarPermisos(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/guardarPermisos", data).then(function (res) {
			deferred.resolve(res.data);
		}, function (err) {
			deferred.reject(err);
			console.log(err);
		});
	}

	function sendCode(user) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/sendCode", user).then(function (res) {
			deferred.resolve(res.data);
		}, function (err) {
			deferred.reject(err);
			console.log(err);
		});

		return deferred.promise;
	}

	function validarCode(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/validarCode", data).then(function (res) {
			deferred.resolve(res.data);
		}).catch(function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

	function compararcontraseñas(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/validarPassword", data).then(function (res) {
			deferred.resolve(res.data);
		}).catch(function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

	function buscarUser(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/buscarUser", data).then(function (res) {
			deferred.resolve(res.data);
		}).catch(function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

	function cambiarEstado(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/cambiarEstado", data).then(function (res) {
			deferred.resolve(res.data);
		}).catch(function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

	function sendLink(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/sendLink", data).then(function (res) {
			deferred.resolve(res.data);
		}).catch(function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

	function validarDatos(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/validarDatos", data).then(function (res) {
			deferred.resolve(res);
		}).catch(function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

	function guardarFirma(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/guardarFirma", data).then(function (res) {
			deferred.resolve(res);
		}).catch(function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}
}