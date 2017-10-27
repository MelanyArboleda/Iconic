angular.module("iconic").service("loginService", loginService);

loginService.$inject = ["$http", "$q", "APP_CONSTANT"];

function loginService($http, $q, appConstant) {
	//defino métodos que va a tener el servicio
	this.login = login;
	this.sendCode = sendCode;
	this.validarCode = validarCode;
	this.compararcontraseñas = compararcontraseñas;
	this.buscarUser = buscarUser;
	this.buscarUsuario = buscarUsuario;
	this.cambiarEstado = cambiarEstado;
	this.sendLink = sendLink;
	this.validarDatos = validarDatos;
	this.guardarFirma = guardarFirma;

	function login(user) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/login", user).then(function (res) {
			deferred.resolve(res.data);
		}, function (err) {
			deferred.reject(err);
			console.log(err);
		});

		return deferred.promise;
	}

	function sendCode(user) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/sendCode", user).then(function (res) {
			deferred.resolve(res.data);
		}, function (err) {
			deferred.reject(err);
			console.log(err);
		});

		return deferred.promise;
	}

	function validarCode(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/validarCode", data).then(function (res) {
			deferred.resolve(res.data);
		}).catch(function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

	function compararcontraseñas(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/validarPassword", data).then(function (res) {
			deferred.resolve(res.data);
		}).catch(function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

	function buscarUser(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarUser", data).then(function (res) {
			deferred.resolve(res.data);
		}).catch(function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

	function buscarUsuario(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarUsuario", data).then(function (res) {
			deferred.resolve(res.data);
		}).catch(function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

	function cambiarEstado(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/cambiarEstado", data).then(function (res) {
			deferred.resolve(res.data);
		}).catch(function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

	function sendLink(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/sendLink", data).then(function (res) {
			deferred.resolve(res.data);
		}).catch(function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

	function validarDatos(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/validarDatos", data).then(function (res) {
			deferred.resolve(res);
		}).catch(function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

	function guardarFirma(data) {
		var deferred = $q.defer();
		$http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/guardarFirma", data).then(function (res) {
			deferred.resolve(res);
		}).catch(function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

}