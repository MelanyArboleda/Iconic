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

	// llama servicio de logueo
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

	// llama servicio de buscar perfiles
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

	// llama servicio de buscar programas
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

	// llama servicio de buscar areas
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

	// llama servicio de buscar facultades
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

	// llama servicio de buscar etapa
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

	// llama servicio de buscar permisos
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

	// llama servicio de guardar permisos
	function guardarPermisos(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/guardarPermisos", data).then(function (res) {
			deferred.resolve(res.data);
		}, function (err) {
			deferred.reject(err);
			console.log(err);
		});
	}

	// llama servicio de enviar codigo
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

	// llama servicio de validar codigo
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

	// llama servicio de comparar contraseñas
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

	// llama servicio de buscar usuario
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

	// llama servicio de cambiar estado
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

	// llama servicio de enviar correo con link
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

	// llama servicio de validar datos
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

	// llama servicio de guardar firma
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