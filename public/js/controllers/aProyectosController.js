angular.module("iconic").controller("aProyectosCtrl", aProyectosCtrl);

aProyectosCtrl.$inject = ["ptdService", "ptdFactory", "serviceNotification"];

function aProyectosCtrl(ptdService, ptdFactory, serviceNotification) {
    var vm = this;
    vm.aProyectos = aProyectos;
    vm.proyectos = ptdFactory.aproyecto;

    function aProyectos() {
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
                ptdFactory.aproyecto[resultado.apartado.id - 1] = resultado.apartado;
                console.log(resultado);
                serviceNotification.success('Apartado guardado correctamente', 2000);
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