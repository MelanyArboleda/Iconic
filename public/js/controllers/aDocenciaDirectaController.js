angular.module("iconic").controller("aDocenciaDirectaCtrl", aDocenciaDirectaCtrl);

aDocenciaDirectaCtrl.$inject = ["DDService", "DDFactory", "ptdService", "ptdFactory", "serviceNotification"];

function aDocenciaDirectaCtrl(DDService, DDFactory, ptdService, ptdFactory, serviceNotification) {
	var vm = this;
	vm.aDocenciaDirecta = aDocenciaDirecta;
	RecargarDD();
	function RecargarDD() {
		vm.docenciaDirecta = DDFactory.DocDir;
		// for (var i = 0; i < vm.docenciaDirecta.length; i++) {
		// 	var semestre = vm.calculahoras(vm.docenciaDirecta[i]);
		// 	ptdFactory.horasemestre.docenciaDirecta += semestre;
		// }
	}
	vm.observacion = {
		id: ptdFactory.ptd.id,
		observaciones_dd: ptdFactory.ptd.observaciones_dd,
	};

	function aDocenciaDirecta() {
		for (var i = 0; i < vm.docenciaDirecta.length; i++) {
			vm.docenciaDirecta[i].tblPtdId = ptdFactory.ptd.id;
			DDService.guardarDD({ datos: vm.docenciaDirecta[i] }).then(function (resultado) {
				if (angular.toJson(resultado) === angular.toJson(vm.docenciaDirecta[i - 1]) || vm.docenciaDirecta[i - 1] == undefined) {
					serviceNotification.success('Apartado guardado correctamente', 3000);
				}
			}).catch(function (err) {
				serviceNotification.error('No se guardó el apartado.', 2000);
			});
		}
		if (vm.observacion.observaciones_dd != null) {
			ptdService.guardarPtd({ datos: vm.observacion }).then(function (next) {
				ptdFactory.buscarPtd({ ptd: ptdFactory.ptd.id }).then(function () {
					RecargarDD();
					vm.observacion = {
						id: ptdFactory.ptd.id,
						observaciones_dd: ptdFactory.ptd.observaciones_dd,
					};
				});
				serviceNotification.success('PTD guardado correctamente', 3000);
			}).catch(function (err) {
				console.log(err);
				serviceNotification.error('Error PTD', 2000);
			});
		}
	}

	vm.calculahoras = function (dd) {
		return (dd.horas_semestrales = dd.horas_semanales * 16);
	};

	vm.ig = ptdFactory.aInfoGeneral;
	vm.min;
	vm.max;

	vm.calculaMin = function () {
		if (vm.ig.dedicacionIG == "Tiempo Completo") {
			vm.min = 14;
		}
		else if (vm.ig.dedicacionIG == "Medio Tiempo") {
			vm.min = 10;
		}
		else {
			vm.min = 8;
		}
	};

	vm.calculaMax = function () {
		if (vm.ig.dedicacionIG == "Tiempo Completo") {
			vm.max = 18;
		}
		else if (vm.ig.dedicacionIG == "Medio Tiempo") {
			vm.max = 14;
		} 
		else {
			vm.max = 10;
		}
	};

	//vm.calculaMin();
	//vm.calculaMax();
};