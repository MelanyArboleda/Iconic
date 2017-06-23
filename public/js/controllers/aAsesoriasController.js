angular.module("iconic").controller("aAsesoriasCtrl", aAsesoriasCtrl);

aAsesoriasCtrl.$inject = ["ptdService", "ptdFactory", "serviceNotification"];

function aAsesoriasCtrl(ptdService, ptdFactory, serviceNotification) {
    var vm = this;
    vm.aAsesorias = aAsesorias;
    vm.asesorias = ptdFactory.aasesoria;

    function aAsesorias() {
        for (var i = 0; i < vm.asesorias.length; i++) {
			vm.asesorias[i].tblPtdId= ptdFactory.ptd.id,
			data = {
				datos: vm.asesorias[i],
				tabla: 'tbl_asesoria_proyectos'
			}
			console.log("llama a servicio Save de asesoria proyectos");
			ptdService.save(data).then(function (resultado) {
				ptdFactory.aasesoria[resultado.apartado.id-1]=resultado.apartado;
				console.log(resultado);
			}).catch(function (err) {
				console.log(err);
				serviceNotification.error('Error . ', 2000);
			});
		}
    }

    vm.addNewAse = function (ase) {
        vm.asesorias.push({
            'integrantes': "",
            'titulo': "",
            'aspectos': "",
            'horas_semestrales': "",
            'estudiante': "",
            'jefe': "",
        });
    };
    vm.removeAse = function () {
        var newDataList = [];
        vm.selectedAll = false;
        angular.forEach(vm.asesorias, function (selected) {
            if (!selected.selected) {
                newDataList.push(selected);
            }
        });
        vm.asesorias = newDataList;
    };
    vm.checkAllAse = function () {
        if (!vm.selectedAll) {
            vm.selectedAll = true;
        } else {
            vm.selectedAll = false;
        }
        angular.forEach(vm.asesorias, function (asesorias) {
            asesorias.selected = vm.selectedAll;
        });
    };
};