angular.module("iconic").controller("aDocenciaDirectaCtrl", aDocenciaDirectaCtrl);

aDocenciaDirectaCtrl.$inject = ["ptdService", "ptdFactory", "loginFactory", "serviceNotification"];

function aDocenciaDirectaCtrl(ptdService, ptdFactory, loginFactory, serviceNotification) {
	var vm = this;
	vm.aDocenciaDirecta = aDocenciaDirecta;
	buscarApartDD();
	function buscarApartDD() {
		ptdFactory.buscarApartDD({ tabla: 'tbl_dodencias_directas', ptd: ptdFactory.ptd.id }).then(function () {
			vm.docenciaDirecta = ptdFactory.adocenciadirecta;
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
					tabla: 'tbl_dodencias_directas'
				}
			console.log("llama a servicio Save de docencia directa");
			ptdService.save(data).then(function (next) {
				serviceNotification.success('Apartado guardado correctamente', 3000);
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
};