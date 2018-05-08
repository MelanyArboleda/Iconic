angular.module("iconic").controller("loginCtrl", loginCtrl);

loginCtrl.$inject = ["loginFactory", "$state", "$scope"];

function loginCtrl(loginFactory, $state, $scope) {
	var vm = this;
	vm.user = {
		correo: "tolosa-321@hotmail.com",
		password: "Iconic123"
	}
	vm.correo = "";

	vm.login = function () {
		loginFactory.login(vm.user).then(function (isLogin) {
			if (isLogin) {
				if (loginFactory.user.estado === 1) {
					if (loginFactory.user.perfil == 7) {
						$state.go("menuPrincipal.Usuarios");
					}else{
						$state.go("menuPrincipal.vistaPTD");
					}
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

	vm.sendLink = function () {
		loginFactory.sendLink({ correo: vm.correo });
		vm.correo = "";
	}

};