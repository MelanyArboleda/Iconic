angular.module("iconic", ["ui.router", "ui.materialize", 'LocalStorageModule']);

angular.module("iconic").run(["$state", "$rootScope", "loginFactory",
	function ($state, $rootScope, loginFactory) {
		loginFactory.isLogin();

		$rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
			console.log("Na na na", toState, toParams, fromState);
			console.log(loginFactory.user, loginFactory.user.username);

			if (toParams.login) {
				console.log("que pasa?", loginFactory.userLogin);
				if (!loginFactory.userLogin) {
					console.log("enviar al login");
					event.preventDefault();
					$state.go("login").then(function (res) {
						console.log(res);
					}).catch(function (res) {
						console.log(res);
					});;
				}
			}
		})
	}
]);

angular.module('iconic').config(["$qProvider", function ($qProvider) {
	$qProvider.errorOnUnhandledRejections(false);
}]);