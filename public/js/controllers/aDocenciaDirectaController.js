angular.module("iconic").controller("aDocenciaDirectaCtrl", aDocenciaDirectaCtrl);

aDocenciaDirectaCtrl.$inject = ["ptdService", "ptdFactory", "serviceNotification"];

function aDocenciaDirectaCtrl(ptdService, ptdFactory, serviceNotification) {
	var vm = this;
	vm.aDocenciaDirecta = aDocenciaDirecta;

	vm.docenciaDirecta = ptdFactory.adocenciadirecta;
	vm.observacion = {
		id: ptdFactory.ptd.id,
		observaciones_dd: ptdFactory.ptd.observaciones_dd,
	};


	function aDocenciaDirecta() {
		for (var i = 0; i < vm.docenciaDirecta.length; i++) {
			vm.docenciaDirecta[i].tblPtdId= ptdFactory.ptd.id,
			data = {
				datos: vm.docenciaDirecta[i],
				tabla: 'tbl_dodencias_directas'
			}
			console.log("llama a servicio Save de docencia directa");
			console.log(ptdFactory.ptd.id,'aaaaaaaaaaaaaaaaaaaaaaa');
			ptdService.save(data).then(function (resultado) {
				console.log(resultado.adocenciadirecta,'bbbbbbbbbbbb');
				ptdFactory.adocenciadirecta[resultado.adocenciadirecta.id-1]=resultado.adocenciadirecta;
				console.log(ptdFactory.adocenciadirecta,'ccccccccccc');
			}).catch(function (err) {
				console.log(err);
				serviceNotification.error('Error . ', 2000);
			});
		}
		if (vm.observacion.observaciones_dd != null) {
			data = {
				datos: vm.observacion,
				tabla: 'tbl_ptds',
			}
			ptdService.save(data).then(function (resultado) {
				ptdFactory.ptd = resultado.ptd;
			}).catch(function (err) {
				console.log(err);
				serviceNotification.error('Error . ', 2000);
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