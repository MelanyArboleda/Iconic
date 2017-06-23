angular.module("iconic").controller("loginCtrl", loginCtrl);

loginCtrl.$inject = ["loginFactory", "$state", "$scope"];

function loginCtrl(loginFactory, $state, $scope) {
	var vm = this;
	vm.login = login;
	vm.user = {
		correo: "gabriel_arboleda23151@elpoli.edu.co",
		password: ""
	}

	function login() {
		loginFactory.login(vm.user).then(function (isLogin) {
			if (isLogin) {
				if (loginFactory.user.estado === 1) {
					$state.go("menuPrincipal.vistaPTD");
				} else if (loginFactory.user.estado === 2) {
					//inactivo
				} else if (loginFactory.user.estado === 3) {
					loginFactory.sendCode();
					$state.go("verificacion");
				} else if (loginFactory.user.estado === 4) {
					$state.go("configini");
				}
			}
		});
	}

	$scope.$on('$stateChangeSuccess', function () {
		loginFactory.isLogin();
	});

};