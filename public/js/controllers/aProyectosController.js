angular.module("iconic").controller("aProyectosCtrl", aProyectosCtrl);

aProyectosCtrl.$inject = ["FPService", "FPFactory","ptdService", "ptdFactory", "serviceNotification", "$q"];

function aProyectosCtrl(FPService, FPFactory, ptdService, ptdFactory, serviceNotification, $q) {
    var vm = this;
    vm.aProyectos = aProyectos;
    recargarFP();
    function recargarFP() {
        vm.proyectos = FPFactory.ForPro;
        for (var i = 0; i < vm.proyectos.length; i++) {
            if (vm.proyectos[i].tblActoreId == 1) {
                vm.proyectos[i].tblActoreId = 'Principal';
            } else {
                vm.proyectos[i].tblActoreId = 'Co-Autor';
            }
        }
    }

    function aProyectos() {
        for (var i = 0; i < vm.proyectos.length; i++) {
            vm.proyectos[i].tblPtdId = ptdFactory.ptd.id;
            if (vm.proyectos[i].tblActoreId == 'Principal') {
                vm.proyectos[i].tblActoreId = 1;
            } else {
                vm.proyectos[i].tblActoreId = 2;
            }

            FPService.guardarFP({ datos: vm.proyectos[i] }).then(function (resultado) {
                if (angular.toJson(resultado) === angular.toJson(vm.proyectos[i - 1]) || vm.proyectos[i - 1] == undefined) {
                    serviceNotification.success('Apartado guardado correctamente', 3000);
                    recargarFP();
                }
            }).catch(function (err) {
                console.log(err);
                serviceNotification.error('No se guardó el apartado', 2000);
            });
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