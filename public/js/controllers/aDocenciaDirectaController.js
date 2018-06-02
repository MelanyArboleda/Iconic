angular.module("iconic").controller("aDocenciaDirectaCtrl", aDocenciaDirectaCtrl);

aDocenciaDirectaCtrl.$inject = ["$rootScope", "DDService", "DDFactory", "ptdService", "ptdFactory", "loginFactory", "IPFactory", "ISFactory", "serviceNotification", "$q", "modalNotifService"];

function aDocenciaDirectaCtrl($rootScope, DDService, DDFactory, ptdService, ptdFactory, loginFactory, IPFactory, ISFactory, serviceNotification, $q, modalNotifService) {
	var vm = this;
	var acciones = "";
	var max;
	var min;
	if ($rootScope.infoReady == true) {		
		cargarDD();
	} else {
		$rootScope.$on("InfoReady", function () {
			cargarDD();
		});
	}
	
	function cargarDD() {
		DDFactory.buscarDocenciaDirecta().then(function () {
			vm.docenciaDirecta = DDFactory.DocDir;
			calcularMinMax();
			if (vm.docenciaDirecta.length == 0) {
				DDService.guardarDD({ ptd: ptdFactory.ptd.id, doc_ident: ptdFactory.ptd.tblUsuarioDocIdentidad }).then(function () {
					cargarDD();
				});
			}
			for (let i = 0; i < vm.docenciaDirecta.length; i++) {
				vm.docenciaDirecta[i].horas_semestrales = calculahoras(vm.docenciaDirecta[i].horas_semanales)
			}
			calcularHorasDD();
		});
		cargarObservacion();
		vm.permiso = loginFactory.estatus.permisos.find(function (permiso) {
			return permiso.tblRecursoId == 1;
		});
	}

	function cargarObservacion() {
		ptdFactory.buscarPtd({ ptd: ptdFactory.ptd.id }).then(function () {
			vm.observacion = {
				id: ptdFactory.ptd.id,
				observaciones_dd: ptdFactory.ptd.observaciones_dd
			};
		});
	}

	vm.saveObservaciones = function () {
		ptdService.guardarPtd({ datos: vm.observacion }).then(function (res) {
			serviceNotification.success('Observación guardada correctamente', 3000);
			cargarObservacion();
		}).catch(function (err) {
			serviceNotification.error('No se pudo guardar la Observación', 2000);
		});
	}

	function calculahoras(horas_semanales) {
		return horas_semanales * 18;
	};

	function calcularMinMax() {
		if (loginFactory.user.dedicacion == 1) { min = 14; max = 18; }
		else if (loginFactory.user.dedicacion == 2) { min = 10; max = 14; }
		else if (loginFactory.user.dedicacion == 3) { min = 12; max = 18; }
		else { min = 8; max = 10; }
	};

	function calcularHorasDD() {
		var docenciaDirecta = sumarHoras(DDFactory.DocDir);
		if (max < docenciaDirecta) {
			modalNotifService.openModal('Hola, la suma de las horas de docencia directa y sus asimilables sobrepasa el màximo de horas permitido.');
		} else {
			if (min > docenciaDirecta && loginFactory.perfil.id == 2) {
				modalNotifService.openModal('Hola, la suma de las horas de docencia directa y sus asimilables es menor al mínimo exigido.');
			}
		}
	}

	function sumarHoras(array) {
		var suma = 0;
		for (i = 0; i < array.length; i++) {
			suma += array[i].horas_semanales
		}
		return suma;
	}
};