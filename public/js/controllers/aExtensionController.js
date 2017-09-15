angular.module("iconic").controller("aExtensionCtrl", aExtensionCtrl);

aExtensionCtrl.$inject = ["AEService", "AEFactory", "ptdService", "ptdFactory", "serviceNotification", "$q"];

function aExtensionCtrl(AEService, AEFactory, ptdService, ptdFactory, serviceNotification, $q) {
    var vm = this;
    vm.aExtension = aExtension;
    recargarAE();
    function recargarAE() {
        vm.extension = AEFactory.ExtPro;
    }

    function aExtension() {
        for (var i = 0; i < vm.extension.length; i++) {
            vm.extension[i].tblPtdId = ptdFactory.ptd.id;
            if (vm.extension[i].aprobado == "") {
                vm.extension[i].aprobado = false;
            }
            AEService.guardarAE({ datos: vm.extension[i] }).then(function (resultado) {
                if (angular.toJson(resultado) === angular.toJson(vm.extension[i - 1]) || vm.extension[i - 1] == undefined) {
                    serviceNotification.success('Apartado guardado correctamente', 3000);
                }
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