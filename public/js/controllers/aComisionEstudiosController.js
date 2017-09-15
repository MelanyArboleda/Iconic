angular.module("iconic").controller("aComisionEstudiosCtrl", aComisionEstudiosCtrl);

aComisionEstudiosCtrl.$inject = ["CEService", "CEFactory", "ptdFactory", "serviceNotification", "$q"];

function aComisionEstudiosCtrl(CEService, CEFactory, ptdFactory, serviceNotification, $q) {
    var vm = this;
    vm.comisionEstudios = comisionEstudios;
    recargarCE();
    function recargarCE() {
        vm.comisionE = CEFactory.ComEst;
    }

    function comisionEstudios() {
        var deferred = $q.defer();
        for (var i = 0; i < vm.comisionE.length; i++) {
            vm.comisionE[i].tblPtdId = ptdFactory.ptd.id
            CEService.guardarCE({ datos: vm.comisionE[i] }).then(function (resultado) {
                if (JSON.stringify(resultado) === JSON.stringify(vm.comisionE[i - 1]) || vm.comisionE[i - 1] == undefined) {
                    serviceNotification.success('Apartado guardado correctamente', 3000);
                }
            }).catch(function (err) {
                console.log(err);
                serviceNotification.error('No se guardó el apartado', 2000);
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