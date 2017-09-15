angular.module("iconic").controller("aAsesoriasCtrl", aAsesoriasCtrl);

aAsesoriasCtrl.$inject = ["APService", "APFactory", "ptdFactory","serviceNotification", "$q"];

function aAsesoriasCtrl(APService, APFactory, ptdFactory, serviceNotification, $q) {
    var vm = this;
    vm.aAsesorias = aAsesorias;
    function buscarApartAP() {
        APFactory.buscarApartAP({ ptd: ptdFactory.ptd.id }).then(function () {
            vm.asesorias = APFactory.AsePro;
        });
    }

    function aAsesorias() {
        saveAsesorias().then(function () { buscarApartAP(); });
        function saveAsesorias() {
            var deferred = $q.defer();
            for (var i = 0; i < vm.asesorias.length; i++) {
                vm.asesorias[i].tblPtdId = ptdFactory.ptd.id,
                    data = {
                        datos: vm.asesorias[i]
                    }
                APService.guardarAP(data).then(function (resultado) {
                    if (JSON.stringify(resultado) === JSON.stringify(vm.asesorias[i-1]) || vm.asesorias[i-1] == undefined) {
                        serviceNotification.success('Apartado guardado correctamente', 3000);
                        deferred.resolve();
                    }
                }).catch(function (err) {
                    console.log(err);
                    serviceNotification.error('No se guardó el apartado', 2000);
                });
            }
            return deferred.promise;
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