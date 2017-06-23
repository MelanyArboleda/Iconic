angular.module("iconic").controller("aExtensionCtrl", aExtensionCtrl);

aExtensionCtrl.$inject = ["ptdService", "ptdFactory", "serviceNotification"];

function aExtensionCtrl(ptdService, ptdFactory, serviceNotification) {
    var vm = this;
    vm.aExtension = aExtension;
    vm.extension = ptdFactory.aextension;

    function aExtension() {
        for (var i = 0; i < vm.extension.length; i++) {
			vm.extension[i].tblPtdId= ptdFactory.ptd.id,
			data = {
				datos: vm.extension[i],
				tabla: 'tbl_actividades_extension'
			}
			console.log("llama a servicio Save de actividades extension");
			ptdService.save(data).then(function (resultado) {
				ptdFactory.aextension[resultado.apartado.id-1]=resultado.apartado;
				console.log(resultado);
                serviceNotification.success('Apartado guardado correctamente', 2000);
			}).catch(function (err) {
				console.log(err);
				serviceNotification.error('No se guardó el apartado', 2000);
			});
		}
    }

    vm.addNewExt = function (ext) {
        vm.extension.push({
            'nombre_actividad': "",
            'fecha_inicio': "",
            'fecha_final': "",
            'horas_semestrales': "",
            'aprobado': "",
        });
    };
    vm.removeExt = function () {
        var newDataList = [];
        vm.selectedAll = false;
        angular.forEach(vm.extension, function (selected) {
            if (!selected.selected) {
                newDataList.push(selected);
            }
        });
        vm.extension = newDataList;
    };
    vm.checkAllExt = function () {
        if (!vm.selectedAll) {
            vm.selectedAll = true;
        } else {
            vm.selectedAll = false;
        }
        angular.forEach(vm.extension, function (extension) {
            extension.selected = vm.selectedAll;
        });
    };
};