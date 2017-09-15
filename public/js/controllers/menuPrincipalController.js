var app = angular.module("iconic").controller("menuPrincipalCtrl", menuPrincipalCtrl);

menuPrincipalCtrl.$inject = ["ptdService", "ptdFactory", "loginFactory", "DDFactory", "ISFactory", "IPFactory", "AEFactory", "CEFactory","serviceNotification", "$q"];

function menuPrincipalCtrl(ptdService, ptdFactory, loginFactory, DDFactory, ISFactory, IPFactory, AEFactory, CEFactory, serviceNotification, $q) {
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
	
	if (ptdFactory.ptd.id == undefined || ptdFactory.ptd.tblUsuarioDocIdentidad != loginFactory.user.doc_identidad) {
		ptdFactory.createPtd({ doc_identidad: loginFactory.user.doc_identidad }).then(function(id_ptd){
			ptdFactory.buscarArea({ doc_identidad: loginFactory.user.doc_identidad }).then(function(){
				ptdFactory.buscarDedicacion({ doc_identidad: loginFactory.user.doc_identidad }).then(function(){
					cargarinfo();
				});
			});			
			DDFactory.buscarApartDD({ ptd: ptdFactory.ptd.id }).then(function () {});
			ISFactory.buscarApartIS({ ptd: ptdFactory.ptd.id }).then(function () {});
			IPFactory.buscarApartIP({ ptd: ptdFactory.ptd.id }).then(function () {});
			AEFactory.buscarApartAE({ ptd: ptdFactory.ptd.id }).then(function () {});
			CEFactory.buscarApartCE({ ptd: ptdFactory.ptd.id }).then(function () {});
		});
	}

	vm.validFechaFinal = function(ext) {
        if (ext.fecha_inicio) {
			var auxFechaInico = new Date(ext.fecha_inicio);
			console.log(auxFechaInico);
			console.log(auxFechaFinal);
			if (ext.fecha_final) {
				var auxFechaFinal = new Date(ext.fecha_final);
				console.log(auxFechaFinal);
				if(auxFechaFinal < auxFechaInico){
					delete ext.fecha_final;
				} 
			}
			ext.fechaFinalValida = (new Date(auxFechaInico.getTime() + (1000 * 60 * 60 * 24 * 1))).toISOString();
		}
	}
	function cargarinfo(){
		ptdFactory.aInfoGeneral.nombreIG= loginFactory.user.nombre;
		ptdFactory.aInfoGeneral.apellido1IG= loginFactory.user.apellido_1;
		ptdFactory.aInfoGeneral.apellido2IG= loginFactory.user.apellido_2;
		ptdFactory.aInfoGeneral.dedicacionIG= ptdFactory.datosig.dedicacion;
		ptdFactory.aInfoGeneral.areaIG= ptdFactory.datosig.area;
		ptdFactory.aInfoGeneral.fechaRealizacion= ptdFactory.ptd.fecha;
	}
};