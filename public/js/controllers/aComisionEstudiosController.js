angular.module("iconic").controller("aComisionEstudiosCtrl", aComisionEstudiosCtrl);

aComisionEstudiosCtrl.$inject = ["ptdService", "ptdFactory", "serviceNotification", "$q"];

function aComisionEstudiosCtrl(ptdService, ptdFactory, serviceNotification, $q) {
    var vm = this;
    vm.comisionEstudios = comisionEstudios;
    buscarApartCE();
    function buscarApartCE() {
        ptdFactory.buscarApartCE({ tabla: 'tbl_comision_estudios', ptd: ptdFactory.ptd.id }).then(function () {
            vm.comisionE = ptdFactory.acomision;
        });
    }

    function comisionEstudios() {
        saveComision().then(function () { buscarApartCE(); });
        function saveComision() {
            var deferred = $q.defer();
            for (var i = 0; i < vm.comisionE.length; i++) {
                vm.comisionE[i].tblPtdId = ptdFactory.ptd.id,
                    data = {
                        datos: vm.comisionE[i],
                        tabla: 'tbl_comision_estudios'
                    }
                console.log("llama a servicio Save de comision de estudios");
                ptdService.save(data).then(function (resultado) {
                    serviceNotification.success('Apartado guardado correctamente', 2000);
                    if (i == vm.comisionE.length - 1) {
                        deferred.resolve();
                        return deferred.promise;
                    }
                }).catch(function (err) {
                    console.log(err);
                    serviceNotification.error('No se guardó el apartado', 2000);
                });
            }

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