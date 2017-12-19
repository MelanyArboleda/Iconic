var app = angular.module("iconic").controller("menuPrincipalCtrl", menuPrincipalCtrl);

menuPrincipalCtrl.$inject = ["ptdFactory", "planesFactory", "loginFactory", "fechaEtapaFactory", "RGFactory", "$state", "$q"];

function menuPrincipalCtrl(ptdFactory, planesFactory, loginFactory, fechaEtapaFactory, RGFactory, $state, $q) {
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
		loginFactory.buscarEtapa().then(function () { });
		loginFactory.cargarEstatus().then(function () {
			console.log("Estatus--------", loginFactory.estatus);
			fechaEtapaFactory.buscarFechaEtapa().then(function () {
				console.log("Fechas--------", fechaEtapaFactory.fechaEtapa);
				if (loginFactory.user.perfil == 1) {
					if (ptdFactory.ptd.id == undefined || ptdFactory.ptd.tblUsuarioDocIdentidad != loginFactory.user.doc_identidad) {
						ptdFactory.createPtd({ doc_identidad: loginFactory.user.doc_identidad }).then(function (ptd) {
							console.log("PTD--------", ptd);
							RGFactory.crearResumenGeneral(ptd.id).then(function (resumen) {
								console.log("resumen--------",resumen);
							});
						});
					}
				} else {
					if (loginFactory.user.perfil == 4) {

					} else {
						var data = fechaEtapaFactory.fechaEtapa[fechaEtapaFactory.fechaEtapa.length - 1];
						planesFactory.buscarPtds({
							id: loginFactory.estatus.facultad.id, semestre: data.semestre, ano: data.ano
						}).then(function () {
							console.log("ptds----------", planesFactory.ptds);
							vm.ptds = planesFactory.ptds;
						});
					}
				}
			});
		});

		vm.cargarPTD = function(ptd){
			ptdFactory.ptd = ptd;
			console.log("PTD-----------",ptdFactory.ptd);
			$state.go("menuPrincipal.AdocenciaDirecta");
		}

		vm.validFechaFinal = function (ext) {
			if (ext.fecha_inicial) {
				var auxFechaInicial = new Date(ext.fecha_inicial);
				console.log(auxFechaInicial);
				console.log(auxFechaFinal);
				if (ext.fecha_final) {
					var auxFechaFinal = new Date(ext.fecha_final);
					console.log(auxFechaFinal);
					if (auxFechaFinal < auxFechaInicial) {
						delete ext.fecha_final;
					}
				}
				// ext.fechaFinalValida = (new Date(auxFechaInicial.getTime() + (1000 * 60 * 60 * 24 * 1))).toISOString();
			}
		}
	}
};