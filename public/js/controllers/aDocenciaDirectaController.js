angular.module("iconic").controller("aDocenciaDirectaCtrl", aDocenciaDirectaCtrl);

aDocenciaDirectaCtrl.$inject = ["ptdService", "ptdFactory", "loginFactory", "serviceNotification"];

function aDocenciaDirectaCtrl(ptdService, ptdFactory, loginFactory, serviceNotification) {
	var vm = this;
	vm.aDocenciaDirecta = aDocenciaDirecta;
	
	buscarApartDD();
	function buscarApartDD() {
		ptdFactory.buscarApartDD({ tabla: 'tbl_docencias_directas', ptd: ptdFactory.ptd.id }).then(function () {
			vm.docenciaDirecta = ptdFactory.adocenciadirecta;
			for (var i = 0; i < vm.docenciaDirecta.length; i++) {
				var semestre = vm.calculahoras(vm.docenciaDirecta[i]);
				ptdFactory.horasemestre.docenciaDirecta += semestre;
			}
		});
	}
	vm.observacion = {
		id: ptdFactory.ptd.id,
		observaciones_dd: ptdFactory.ptd.observaciones_dd,
	};

	function aDocenciaDirecta() {
		for (var i = 0; i < vm.docenciaDirecta.length; i++) {
			vm.docenciaDirecta[i].tblPtdId = ptdFactory.ptd.id,
				data = {
					datos: vm.docenciaDirecta[i],
					tabla: 'tbl_docencias_directas'
				}
			console.log("llama a servicio Save de docencia directa");
			ptdService.save(data).then(function (resultado) {
				if (JSON.stringify(resultado) === JSON.stringify(vm.docenciaDirecta[i - 1]) || vm.docenciaDirecta[i - 1] == undefined) {
					serviceNotification.success('Apartado guardado correctamente', 3000);
				}
			}).catch(function (err) {
				serviceNotification.error('No se guardó el apartado.', 2000);
			});
		}
		if (vm.observacion.observaciones_dd != null) {
			data = {
				datos: vm.observacion,
				tabla: 'tbl_ptds',
			}
			ptdService.save(data).then(function (next) {
				ptdFactory.buscarPtd({ tabla: 'tbl_ptds', ptd: ptdFactory.ptd.id }).then(function () {
					buscarApartDD();
					vm.observacion = {
						id: ptdFactory.ptd.id,
						observaciones_dd: ptdFactory.ptd.observaciones_dd,
					};
				});
				serviceNotification.success('PTD actualizó correctamente', 3000);
			}).catch(function (err) {
				console.log(err);
				serviceNotification.error('Error PTD.', 2000);
			});
		}
	}

	vm.addNewDD = function (dd) {
		vm.docenciaDirecta.push({
			'nombre_asignatura': "",
			'codigo_asignatura': "",
			'grupo_asignatura': "",
			'numero_estudiantes': "",
			'horas_semanales': "",
			'horas_semestrales': "",
			'estudiante': "",
			'jefe': "",
		});
	};

	vm.removeDD = function () {
		var newDataList = [];
		vm.selectedAll = false;
		angular.forEach(vm.docenciaDirecta, function (selected) {
			if (!selected.selected) {
				newDataList.push(selected);
			}
		});
		vm.docenciaDirecta = newDataList;
	};
	vm.checkAllDD = function () {
		if (!vm.selectedAll) {
			vm.selectedAll = true;
		} else {
			vm.selectedAll = false;
		}
		angular.forEach(vm.docenciaDirecta, function (docenciaDirecta) {
			docenciaDirecta.selected = vm.selectedAll;
		});
	};

	vm.calculahoras = function (dd) {
		return(dd.horas_semestrales = dd.horas_semanales * 16);
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

	vm.calculaMin();
	vm.calculaMax();
};