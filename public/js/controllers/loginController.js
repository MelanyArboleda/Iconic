angular.module("iconic").controller("loginCtrl", loginCtrl);

loginCtrl.$inject = ["loginFactory", "$state", "$scope"];

function loginCtrl(loginFactory, $state, $scope) {
	var vm = this;
	vm.login = login;
	vm.user = {
		correo: "",
		password: ""
	}

	function login() {
		loginFactory.login(vm.user).then(function (isLogin) {

			if (isLogin) {
				if (loginFactory.user.estado === 2) {
					loginFactory.sendCode();
					$state.go("verificacion");					
				} else {
					$state.go("menuPrincipal");
				}
			}
		});
	}

	$scope.$on('$stateChangeSuccess', function () {
		loginFactory.isLogin();
	});

};