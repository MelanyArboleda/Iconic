angular.module("iconic").service("loginService", loginService);

loginService.$inject = ["$http", "$q"];

function loginService($http, $q) {
	//defino métodos que va a tener el servicio
	this.login = login;
	this.sendCode = sendCode;
	this.validarCodigo = validarCodigo;

	function login(user) {
		// console.log(user);
		var deferred = $q.defer();

		$http.post("http://localhost:3000/auth/login", user).then(function (res) {
			console.log(res);
			deferred.resolve(res.data);
		}, function (err) {
			deferred.reject(err);
			console.log(err);
		});

		return deferred.promise;

		// if (user.username === "melany") {
		// 	user.name = "Melany A.";
		// 	return user;
		// } else {
		// 	console.log("Bla bla bla");
		// }		
	}

	function sendCode(user) {
		var deferred = $q.defer();
		console.log("sending", user);
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
		console.log("validando tu tu tu");
		$http.post("http://localhost:3000/auth/actic", data).then(function (res) {
			console.log(res);
			deferred.resolve(res.data);
		}).catch(function (err) {
			deferred.reject(err);
			console.log(err);
		});
		return deferred.promise;
	}
}