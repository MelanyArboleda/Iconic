angular.module("iconic").controller("aComisionEstudiosCtrl", aComisionEstudiosCtrl);

aComisionEstudiosCtrl.$inject = ["ptdService", "ptdFactory", "serviceNotification"];

function aComisionEstudiosCtrl(ptdService, ptdFactory, serviceNotification) {
    var vm = this;
    vm.comisionEstudios = comisionEstudios;
    vm.comisionE = ptdFactory.acomision;

    function comisionEstudios() {
        for (var i = 0; i < vm.comisionE.length; i++) {
			vm.comisionE[i].tblPtdId= ptdFactory.ptd.id,
			data = {
				datos: vm.comisionE[i],
				tabla: 'tbl_comision_estudios'
			}
			console.log("llama a servicio Save de comision de estudios");
			ptdService.save(data).then(function (resultado) {
				ptdFactory.acomision[resultado.apartado.id-1]=resultado.apartado;
				console.log(resultado);
			}).catch(function (err) {
				console.log(err);
				serviceNotification.error('Error . ', 2000);
			});
		}
    }

    vm.addNewComE = function (comE) {
        vm.comisionE.push({
            'universidad': "",
            'tipo_estudio': "",
            'nombre_estudio': "",
            'fecha_inicio': "",
            'fecha_graduacion': "",
            'fecha_obtencion_autorizacion': "",
            'aportes_inst_obtenidos': "",
        });
    };
    vm.removeComE = function () {
        var newDataList = [];
        vm.selectedAll = false;
        angular.forEach(vm.comisionE, function (selected) {
            if (!selected.selected) {
                newDataList.push(selected);
            }
        });
        vm.comisionE = newDataList;
    };
    vm.checkAllcomE = function () {
        if (!vm.selectedAll) {
            vm.selectedAll = true;
        } else {
            vm.selectedAll = false;
        }
        angular.forEach(vm.comisionE, function (comisionE) {
            comisionE.selected = vm.selectedAll;
        });
    };
};