angular.module("iconic").controller("aInvestigacionesSCtrl", aInvestigacionesSCtrl);

aInvestigacionesSCtrl.$inject = ["ISService", "ISFactory", "ptdService", "ptdFactory", "serviceNotification", "$q"];

function aInvestigacionesSCtrl(ISService, ISFactory, ptdService, ptdFactory, serviceNotification, $q) {
    var vm = this;
    vm.aInvestigacionesS = aInvestigacionesS;
    recargarIS();
    function recargarIS() {
        vm.semillerosInvestigaciones = ISFactory.InvSem;
        for (var i = 0; i < vm.semillerosInvestigaciones.length; i++) {
            if (vm.semillerosInvestigaciones[i].tblVinculoId == 1) {
                vm.semillerosInvestigaciones[i].tblVinculoId = 'Director';
            } else {
                vm.semillerosInvestigaciones[i].tblVinculoId = 'Miembro';
            }
        }
        // for (var i = 0; i < vm.semillerosInvestigaciones.length; i++) {
        //     var semestre = vm.calculahoras(vm.semillerosInvestigaciones[i]);
        //     ptdFactory.horasemestre.semillerosInvestigaciones += semestre;
        // }
    }

    function aInvestigacionesS() {
        for (var i = 0; i < vm.semillerosInvestigaciones.length; i++) {
            vm.semillerosInvestigaciones[i].tblPtdId = ptdFactory.ptd.id;
            if (vm.semillerosInvestigaciones[i].tblVinculoId == 'Director') {
                vm.semillerosInvestigaciones[i].tblVinculoId = 1;
            } else {
                vm.semillerosInvestigaciones[i].tblVinculoId = 2;
            }
            if (vm.semillerosInvestigaciones[i].aprobado == "") {
                vm.semillerosInvestigaciones[i].aprobado = false;
            }

            ISService.guardarIS({ datos: vm.semillerosInvestigaciones[i] }).then(function (resultado) {
                if (angular.toJson(resultado) === angular.toJson(vm.semillerosInvestigaciones[i - 1]) || vm.semillerosInvestigaciones[i - 1] == undefined) {
                    serviceNotification.success('Apartado guardado correctamente', 3000);
                    recargarIS();
                }
            }).catch(function (err) {
                console.log(err);
                serviceNotification.error('No se guardó el apartado', 2000);
            });
        }
    }

    vm.vinculosG = ['Director', 'Miembro'];

    vm.gInvAddNew = function (gI) {
        vm.semillerosInvestigaciones.push({
            'nombre_semillero': "",
            'tblVinculoId': "",
            'actividad_desarrollada': "",
            'producto': "",
            'horas_semanales': "",
            'horas_semestrales': "",
            'aprobado': "",
        });
    };

    vm.gInvRemove = function () {
        var newDataList = [];
        vm.selectedAllG = false;
        angular.forEach(vm.semillerosInvestigaciones, function (selectedG) {
            if (!selectedG.selectedG) {
                newDataList.push(selectedG);
            }
        });
        vm.semillerosInvestigaciones = newDataList;
    };

    vm.gInvcheckAll = function () {
        if (!vm.selectedAllG) {
            vm.selectedAllG = true;
        } else {
            vm.selectedAllG = false;
        }
        angular.forEach(vm.semillerosInvestigaciones, function (semillerosInvestigaciones) {
            semillerosInvestigaciones.selected = vm.selectedAllG;
        });
    };

    vm.calculahoras = function (inv) {
        return (inv.horas_semestrales = inv.horas_semanales * 22.5);
    };
};