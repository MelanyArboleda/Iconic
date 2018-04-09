angular.module("iconic").controller("verificacionCtrl", verificacionCtrl);

verificacionCtrl.$inject = ["loginService", "loginFactory", "serviceNotification", "$state"];

function verificacionCtrl(loginService, loginFactory, serviceNotification, $state) {
	var vm = this;
	vm.codigo = "";

	vm.validar = function () {
		var data = {
			codigo: vm.codigo,
			codigoEncriptado: loginFactory.codigoVerificacion
		};
		loginService.validarCode(data).then(function (res) {
			var data = {
				doc_identidad: loginFactory.user.doc_identidad,
				tblEstadoId: 4
			};
			loginService.cambiarEstado(data).then(function (result) {
				loginFactory.user = result.user;
				$state.go("configini");
			}).catch(function (err) {
				serviceNotification.error('Su cuenta no pudo ser verificada', 2000);
			});
		}).catch(function (err) {
			serviceNotification.error('No es un código válido', 2000);
		});
	}

	vm.reenviar = function () {
		loginFactory.sendCode().then(function (resp) {
			if (resp) {
				serviceNotification.success('Código enviado', 2000);
			}
		});
	}
	if (loginFactory.codigoVerificacion == null) {
		$state.go("login");
	}
}