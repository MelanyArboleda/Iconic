angular.module("iconic").controller("aAsesoriasCtrl", aAsesoriasCtrl);

aAsesoriasCtrl.$inject = ["APService", "APFactory", "ptdFactory", "serviceNotification", "$q"];

function aAsesoriasCtrl(APService, APFactory, ptdFactory, serviceNotification, $q) {
    var vm = this;
    vm.aAsesorias = aAsesorias;
    recargaAP();
    function recargaAP() {
        vm.asesorias = APFactory.AsePro;
    }

    function aAsesorias() {
        for (var i = 0; i < vm.asesorias.length; i++) {
            vm.asesorias[i].tblPtdId = ptdFactory.ptd.id
            APService.guardarAP({ datos: vm.asesorias[i] }).then(function (resultado) {
                if (JSON.stringify(resultado) === JSON.stringify(vm.asesorias[i - 1]) || vm.asesorias[i - 1] == undefined) {
                    serviceNotification.success('Apartado guardado correctamente', 3000);
                    recargaAP();
                }
            }).catch(function (err) {
                console.log(err);
                serviceNotification.error('No se guardó el apartado', 2000);
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