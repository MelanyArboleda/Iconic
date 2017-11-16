angular.module("iconic").controller("aInfoGeneralCtrl", aInfoGeneralCtrl);

aInfoGeneralCtrl.$inject = ["ptdFactory", "serviceNotification"];

function aInfoGeneralCtrl(ptdFactory, serviceNotification) {
	var vm = this;
	vm.aInfoGeneral = aInfoGeneral;
	vm.infoGeneral = ptdFactory.aInfoGeneral;

	function aInfoGeneral() {
		
	}
};

