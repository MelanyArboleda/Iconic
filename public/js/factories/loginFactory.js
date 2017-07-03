angular.module("iconic").factory("loginFactory", loginFactory);

loginFactory.$inject = ["loginService", "$state", "serviceNotification", "$q", "localStorageService"];

function loginFactory(loginService, $state, serviceNotification, $q, localStorageService) {

	var factory = {
		user: {},
		login: login,
		logout: logout,
		userLogin: false,
		isLogin: isLogin,
		sendCode: sendCode,
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
			serviceNotification.success("Bienvenido a ICONIC", 2000);
		}).catch(function (err) {
			deferred.reject(err);
			serviceNotification.error("Ingresa los datos correctamente", 2000);
		});

		return deferred.promise;
	}

	function logout() {
		factory.user = {};
		localStorageService.remove("loginToken");
		$state.go("login");
		factory.userLogin = false;
	}

	function isLogin() {
		var token = localStorageService.get("loginToken");
		if (token) {
			loginService.busacarUser({ token: token }).then(function (user) {
				factory.user = user.user;
				factory.userLogin = true;
				$state.go("menuPrincipal.vistaPTD").catch(function (err) { console.log(err) });
			});
		} else {
			$state.go("login");
		}
		return factory.userLogin;
	}

	function sendCode() {
		loginService.sendCode(factory.user).then(function (codigoVerificacion) {
			factory.codigoVerificacion = codigoVerificacion;
		});
	}
}