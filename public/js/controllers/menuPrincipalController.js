var app = angular.module("iconic").controller("menuPrincipalCtrl", menuPrincipalCtrl);

menuPrincipalCtrl.$inject = ["ptdService", "ptdFactory", "loginFactory", "fechaEtapaFactory", "DDFactory", "ISFactory", "IPFactory", "AEFactory", "CEFactory", "FPFactory", /*"APFactory",*/ /*"RGFactory",*/ "serviceNotification", "$state", "$q"];

function menuPrincipalCtrl(ptdService, ptdFactory, loginFactory, fechaEtapaFactory, DDFactory, ISFactory, IPFactory, AEFactory, CEFactory, FPFactory, /*APFactory,*/ /*RGFactory,*/ serviceNotification, $state, $q) {
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
	var daysmax = 0;
	var daysmin = 150;
	var daysminExt = 1;
	var daysmaxExt = 150;
	vm.minDate = (new Date(vm.currentTime.getTime() - (1000 * 60 * 60 * 24 * daysmin))).toISOString();
	vm.maxDate = (new Date(vm.currentTime.getTime() + (1000 * 60 * 60 * 24 * daysmax))).toISOString();

	var fechaSel = vm.fecha_inicio;

	vm.minDateIExt = (new Date(vm.currentTime.getTime() - (1000 * 60 * 60 * 24 * daysmin))).toISOString();
	vm.maxDateIExt = (new Date(vm.currentTime.getTime() + (1000 * 60 * 60 * 24 * daysmax))).toISOString();

	vm.minDateFExt = fechaSel;
	vm.maxDateFExt = (new Date(vm.currentTime.getTime() + (1000 * 60 * 60 * 24 * daysmaxExt))).toISOString();
	if (loginFactory.user.estado != 1) {
		$state.go("login");
	} else {
		loginFactory.buscarPerfil().then(function () { });
		loginFactory.cargarEstatus().then(function () { });
		fechaEtapaFactory.buscarFechaEtapa().then(function () {
			loginFactory.buscarEtapa().then(function () { });
		});
		if (loginFactory.user.perfil == 1) {
			if (ptdFactory.ptd.id == undefined || ptdFactory.ptd.tblUsuarioDocIdentidad != loginFactory.user.doc_identidad) {
				ptdFactory.createPtd({ doc_identidad: loginFactory.user.doc_identidad }).then(function (ptd) {
					console.log("PTD--------", ptd);
					DDFactory.buscarApartDD({ ptd: ptdFactory.ptd.id }).then(function () { });
					ISFactory.buscarApartIS({ ptd: ptdFactory.ptd.id }).then(function () { });
					IPFactory.buscarApartIP({ ptd: ptdFactory.ptd.id }).then(function () { });
					AEFactory.buscarApartAE({ ptd: ptdFactory.ptd.id }).then(function () { });
					CEFactory.buscarApartCE({ ptd: ptdFactory.ptd.id }).then(function () { });
					FPFactory.buscarApartFP({ ptd: ptdFactory.ptd.id }).then(function () { });
					APFactory.buscarApartAP({ ptd: ptdFactory.ptd.id }).then(function () { });
					//RGFactory.buscarApartRG({ ptd: ptdFactory.ptd.id }).then(function () {});
				});
			}
		} else {

		}

		vm.validFechaFinal = function (ext) {
			if (ext.fecha_inicio) {
				var auxFechaInico = new Date(ext.fecha_inicio);
				console.log(auxFechaInico);
				console.log(auxFechaFinal);
				if (ext.fecha_final) {
					var auxFechaFinal = new Date(ext.fecha_final);
					console.log(auxFechaFinal);
					if (auxFechaFinal < auxFechaInico) {
						delete ext.fecha_final;
					}
				}
				ext.fechaFinalValida = (new Date(auxFechaInico.getTime() + (1000 * 60 * 60 * 24 * 1))).toISOString();
			}
		}
	}
};