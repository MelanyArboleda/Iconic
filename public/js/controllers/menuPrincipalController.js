var app = angular.module("iconic").controller("menuPrincipalCtrl", menuPrincipalCtrl);

menuPrincipalCtrl.$inject = ["ptdService", "ptdFactory", "loginFactory", "serviceNotification", "$q"];

function menuPrincipalCtrl(ptdService, ptdFactory, loginFactory, serviceNotification, $q) {
	var vm = this;
	var currentTime = new Date();
	vm.currentTime = currentTime;
	vm.month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
	vm.monthShort = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
	vm.weekdaysFull = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
	vm.weekdaysLetter = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
	vm.disable = [false, 1, 7];
	vm.today = 'Hoy';
	vm.clear = 'Limpiar';
	vm.close = 'Cerrar';
	var days = 0;
	//vm.minDate = (new Date(vm.currentTime.getTime() - (1000 * 60 * 60 * 24 * days))).toISOString();
	vm.maxDate = (new Date(vm.currentTime.getTime() + (1000 * 60 * 60 * 24 * days))).toISOString();

	if (ptdFactory.ptd.id == undefined) {
		ptdFactory.createPtd({ doc_identidad: loginFactory.user.doc_identidad }).then(function () {
			// if (ptdFactory.adocenciadirecta[0].id == undefined) {
			// 	ptdFactory.buscarApart({ id: ptdFactory.ptd.id, tabla: 'tbl_dodencias_directas' });
			// }
		});
	// } else {
	// 	if (ptdFactory.adocenciadirecta[0].id == undefined) {
	// 		ptdFactory.buscarApart({ id: ptdFactory.ptd.id, tabla: 'tbl_dodencias_directas' });
	// 	}
	 }
};