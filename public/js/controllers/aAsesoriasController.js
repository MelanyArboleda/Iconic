angular.module("iconic").controller("aAsesoriasCtrl", aAsesoriasCtrl);

aAsesoriasCtrl.$inject = ["ptdService", "ptdFactory", "serviceNotification", "$q"];

function aAsesoriasCtrl(ptdService, ptdFactory, serviceNotification, $q) {
    var vm = this;
    vm.aAsesorias = aAsesorias;
    buscarApartAP();
    function buscarApartAP() {
        ptdFactory.buscarApartAP({ tabla: 'tbl_asesoria_proyectos', ptd: ptdFactory.ptd.id }).then(function () {
            vm.asesorias = ptdFactory.aasesoria;
        });
    }

    function aAsesorias() {
        saveAsesorias().then(function () { buscarApartAP(); });
        function saveAsesorias() {
            var deferred = $q.defer();
            for (var i = 0; i < vm.asesorias.length; i++) {
                vm.asesorias[i].tblPtdId = ptdFactory.ptd.id,
                    data = {
                        datos: vm.asesorias[i],
                        tabla: 'tbl_asesoria_proyectos'
                    }
                console.log("llama a servicio Save de asesoria proyectos");
                ptdService.save(data).then(function (resultado) {
                    serviceNotification.success('Apartado guardado correctamente', 3000);
                    if (i == vm.asesorias.length - 1) {
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