angular.module("iconic").controller("aInfoGeneralCtrl", aInfoGeneralCtrl);

aInfoGeneralCtrl.$inject = ["ptdFactory", "loginFactory", "serviceNotification"];

function aInfoGeneralCtrl(ptdFactory, loginFactory, serviceNotification) {
	var vm = this;
	vm.aInfoGeneral = aInfoGeneral;
	vm.infoGeneral = ptdFactory.aInfoGeneral;

	function aInfoGeneral() {
		
	}
};

