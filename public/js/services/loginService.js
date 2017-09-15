angular.module("iconic").service("loginService", loginService);

loginService.$inject = ["$http", "$q"];

function loginService($http, $q) {
	//defino métodos que va a tener el servicio
	this.login = login;
	this.sendCode = sendCode;
	this.validarCodigo = validarCodigo;
	this.compararcontraseñas = compararcontraseñas;
	this.busacarUser = busacarUser;

	function login(user) {
		var deferred = $q.defer();
		$http.post("http://localhost:3000/auth/login", user).then(function (res) {
			console.log(res);
			deferred.resolve(res.data);
		}, function (err) {
			deferred.reject(err);
			console.log(err);
		});

		return deferred.promise;	
	}

	function sendCode(user) {
		var deferred = $q.defer();
		$http.post("http://localhost:3000/auth/sendCode", user).then(function (res) {
			console.log(res);
			deferred.resolve(res.data);
		}, function (err) {
			deferred.reject(err);
			console.log(err);
		});

		return deferred.promise;
	}

	function validarCodigo(data) {
		var deferred = $q.defer();
		$http.post("http://localhost:3000/auth/actic", data).then(function (res) {
			console.log(res);
			deferred.resolve(res.data);
		}).catch(function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

	function compararcontraseñas(data) {
		var deferred = $q.defer();
		$http.post("http://localhost:3000/auth/configp", data).then(function (res) {
			console.log(res);
			deferred.resolve(res.data);
		}).catch(function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

	function busacarUser(data) {
		var deferred = $q.defer();
		$http.post("http://localhost:3000/auth/buscarUser", data).then(function (res) {
			console.log(res);
			deferred.resolve(res.data);
		}).catch(function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}

}