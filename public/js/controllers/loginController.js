angular.module("iconic").controller("loginCtrl", loginCtrl);

loginCtrl.$inject = ["loginFactory", "$state", "$scope","modalNotifService"];

function loginCtrl(loginFactory, $state, $scope,modalNotifService) {
	var vm = this;
	vm.user = {
		correo: "tolosa-321@hotmail.com",
		password: "Iconic123"
	}
	vm.correo = "";

	vm.login = function () {
		var formatoCorreo = vm.user.correo.split('@');
		// if(formatoCorreo[1]=="elpoli.edu.co"){
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
		// }else{
		// 	   modalNotifService.openModal('¡AVISO! : El correo debe contener el formato institucional: '@elpoli.edu.co' ');
		// }
	}

	vm.sendLink = function () {
		loginFactory.sendLink({ correo: vm.correo });
		vm.correo = "";
	}

};