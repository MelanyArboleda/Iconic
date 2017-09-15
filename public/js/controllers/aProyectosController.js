angular.module("iconic").controller("aProyectosCtrl", aProyectosCtrl);

aProyectosCtrl.$inject = ["ptdService", "ptdFactory", "serviceNotification", "$q"];

function aProyectosCtrl(ptdService, ptdFactory, serviceNotification, $q) {
    var vm = this;
    vm.aProyectos = aProyectos;
    buscarApartPP();
    function buscarApartPP() {
        ptdFactory.buscarApartPP({ tabla: 'tbl_formulacion_proyectos', ptd: ptdFactory.ptd.id }).then(function () {
            vm.proyectos = ptdFactory.aproyecto;
            for (var i = 0; i < vm.proyectos.length; i++) {
                if (vm.proyectos[i].tblActoreId == 1) {
                    vm.proyectos[i].tblActoreId = 'Principal';
                } else {
                    vm.proyectos[i].tblActoreId = 'Co-Autor';
                }
            }
        });
    }

    function aProyectos() {
        saveProyectos().then(function () { buscarApartPP(); });
        function saveProyectos() {
            var deferred = $q.defer();
            for (var i = 0; i < vm.proyectos.length; i++) {
                vm.proyectos[i].tblPtdId = ptdFactory.ptd.id;
                if (vm.proyectos[i].tblActoreId == 'Principal') {
                    vm.proyectos[i].tblActoreId = 1;
                } else {
                    vm.proyectos[i].tblActoreId = 2;
                }
                data = {
                    datos: vm.proyectos[i],
                    tabla: 'tbl_formulacion_proyectos'
                }
                console.log("llama a servicio Save de formulacion proyectos");
                ptdService.save(data).then(function (resultado) {
                    if (angular.toJson(resultado) === angular.toJson(vm.proyectos[i-1]) || vm.proyectos[i-1] == undefined) {
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

    vm.actores = ['Principal', 'Co-Autor'];

    vm.addNewProy = function (proy) {
        vm.proyectos.push({
            'nombre_articulo': "",
            'tblActoreId': "",
            'tema_ppal': "",
            'horas_semestrales': "",
        });
    };
    vm.removeProy = function () {
        var newDataList = [];
        vm.selectedAll = false;
        angular.forEach(vm.proyectos, function (selected) {
            if (!selected.selected) {
                newDataList.push(selected);
            }
        });
        vm.proyectos = newDataList;
    };
    vm.checkAllProy = function () {
        if (!vm.selectedAll) {
            vm.selectedAll = true;
        } else {
            vm.selectedAll = false;
        }
        angular.forEach(vm.proyectos, function (proyectos) {
            proyectos.selected = vm.selectedAll;
        });
    };
};