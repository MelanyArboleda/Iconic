angular.module("iconic").controller("aInfoGeneralCtrl", aInfoGeneralCtrl);

aInfoGeneralCtrl.$inject = ["ptdFactory", "loginFactory", "serviceNotification"];

function aInfoGeneralCtrl(ptdFactory, loginFactory, serviceNotification) {
	var vm = this;
	vm.aInfoGeneral = aInfoGeneral;
	vm.infoGeneral = {
		nombreIG: loginFactory.user.nombre,
		apellido1IG: loginFactory.user.apellido_1,
		apellido2IG: loginFactory.user.apellido_2,
		dedicacionIG: "",
		areaIG: "",
		fechaRealizacion: "",
	}
	ptdFactory.aInfoGeneral = vm.infoGeneral;
	vm.dedicacionIG = ['Tiempo Completo', 'Medio Tiempo', 'Ocasional MT'];
	vm.areaIG = ['Programas Informáticos'];

	function aInfoGeneral() {
		console.log(vm.infoGeneral);
	}
};

