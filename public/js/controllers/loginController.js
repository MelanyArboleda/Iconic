angular.module("iconic").controller("loginCtrl", loginCtrl);

loginCtrl.$inject = ["loginFactory", "$state", "$scope"];

function loginCtrl(loginFactory, $state, $scope) {
	var vm = this;
	vm.login = login;
	vm.sendLink = sendLink;
	vm.user = {
		correo: "tolosa-321@hotmail.com",
		password: "Iconic123"
	}
	vm.correo = "";

	function login() {
		loginFactory.login(vm.user).then(function (isLogin) {
			if (isLogin) {
				if (loginFactory.user.estado === 1) {
					$state.go("menuPrincipal.vistaPTD");
				} else if (loginFactory.user.estado === 3) {
					if (loginFactory.codigoVerificacion == null) {
						loginFactory.sendCode().then(function (resp) {
							if (resp) {
								$state.go("verificacion");
							}
						});
					} else {
						$state.go("verificacion");
					}
				} else if (loginFactory.user.estado === 4) {
					$state.go("configini");
				}
			}
		});
	}

	function sendLink() {
		loginFactory.sendLink({ correo: vm.correo });
	}
	if (loginFactory.user.estado == 1) {
		$state.go("menuPrincipal.vistaPTD");
	}
};