angular.module("iconic").controller("verificacionCtrl", verificacionCtrl);

verificacionCtrl.$inject = ["loginService", "loginFactory", "serviceNotification", "$state"];

function verificacionCtrl(loginService, loginFactory, serviceNotification, $state) {
	var vm = this;
	vm.validar = validar;
	vm.codigo = "";

	function validar(){
		var data = {
			codigo: vm.codigo,
			codigoEncriptado: loginFactory.codigoVerificacion,
			doc_identidad: loginFactory.user.doc_identidad
		};
		console.log("llamando al validar");
		loginService.validarCodigo(data).then(function(resultado){
			loginFactory.user = resultado.user;
			console.log(resultado);
			serviceNotification.success('Código válido', 2000);
			$state.go("configini");
		}).catch(function(err){
			console.log(err);
			serviceNotification.error('No es un código válido', 2000);
		});
	}
}