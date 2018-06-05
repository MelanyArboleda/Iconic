angular.module("iconic").controller("verificacionCtrl", verificacionCtrl);

verificacionCtrl.$inject = ["loginService", "loginFactory", "serviceNotification", "$state", "modalNotifService"];

function verificacionCtrl(loginService, loginFactory, serviceNotification, $state, modalNotifService) {
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
				serviceNotification.error('No se puedo verificar la cuenta', 2000);
			});
		}).catch(function (err) {
			serviceNotification.error('El código no es válido', 2000);
		});
	}

	vm.reenviar = function () {
		loginFactory.sendCode().then(function (resp) {
			if (resp) {
				modalNotifService.openModal('Hola, se ha enviado a tu correo institucional un código de verificación, introdúcelo a continuación para proceder con la verificación de tu cuenta.');
			}
		});
	}
	if (loginFactory.codigoVerificacion == null) {
		$state.go("login");
	}
}