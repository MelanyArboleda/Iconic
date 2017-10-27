angular.module("iconic").controller("aInvestigacionesPCtrl", aInvestigacionesPCtrl);

aInvestigacionesPCtrl.$inject = ["IPService", "IPFactory", "ptdService", "ptdFactory", "serviceNotification", "$q"];

function aInvestigacionesPCtrl(IPService, IPFactory, ptdService, ptdFactory, serviceNotification, $q) {
    var vm = this;
    vm.aInvestigacionesP = aInvestigacionesP;
    vm.vinculosP = [];
    function recargarIP() {
        vm.proyectosInvestigaciones = IPFactory.InvPro;
        for (var i = 0; i < vm.proyectosInvestigaciones.length; i++) {
            vm.proyectosInvestigaciones[i].tblVinculoId = vm.vinculosP.find(function(vin){
                console.log('hola', vm.proyectosInvestigaciones[i].tblVinculoId === vin.id)
                return vm.proyectosInvestigaciones[i].tblVinculoId === vin.id
            });
            // if (vm.proyectosInvestigaciones[i].tblVinculoId == 3) {
            //     vm.proyectosInvestigaciones[i].tblVinculoId = 'Investigador Principal';
            // } else {
            //     vm.proyectosInvestigaciones[i].tblVinculoId = 'Co-Investigador';
            // }
        }

        // for (var i = 0; i < vm.proyectosInvestigaciones.length; i++) {
        //     var semestre = vm.calculahoras(vm.proyectosInvestigaciones[i]);
        //     ptdFactory.horasemestre.proyectosInvestigaciones += semestre;
        // }
    }

    function aInvestigacionesP() {
        for (var i = 0; i < vm.proyectosInvestigaciones.length; i++) {
            vm.proyectosInvestigaciones[i].tblPtdId = ptdFactory.ptd.id;
            vm.proyectosInvestigaciones[i].tblVinculoId = vm.proyectosInvestigaciones[i].tblVinculoId.id;
            // if (vm.proyectosInvestigaciones[i].tblVinculoId == 'Investigador Principal') {
            //     vm.proyectosInvestigaciones[i].tblVinculoId = 3;
            // } else {
            //     vm.proyectosInvestigaciones[i].tblVinculoId = 4;
            // }
            if (vm.proyectosInvestigaciones[i].aprobado == "") {
                vm.proyectosInvestigaciones[i].aprobado = false;
            }

            IPService.guardarIP({ datos: vm.proyectosInvestigaciones[i] }).then(function (resultado) {
                if (angular.toJson(resultado) === angular.toJson(vm.proyectosInvestigaciones[i - 1]) || vm.proyectosInvestigaciones[i - 1] == undefined) {
                    serviceNotification.success('Apartado guardado correctamente', 3000);
                    console.log('save', vm.proyectosInvestigaciones )
                    recargarIP();
                }
            }).catch(function (err) {
                console.log(err);
                serviceNotification.error('No se guardó el apartado P', 2000);
            });
        }
    }

    IPService.buscarVP().then(function (resultado) {
        vm.vinculosP = resultado;
        recargarIP();
    });

    vm.pInvAddNew = function (pI) {
        vm.proyectosInvestigaciones.push({
            'nombre_proyecto': "",
            'tblVinculoId': "",
            'objetivo_principal': "",
            'producto': "",
            'horas_semanales': "",
            'horas_semestrales': "",
            'aprobado': "",
        });
    };

    vm.pInvRemove = function () {
        var newDataList = [];
        vm.selectedAllP = false;
        angular.forEach(vm.proyectosInvestigaciones, function (selectedP) {
            if (!selectedP.selectedP) {
                newDataList.push(selectedP);
            }
        });
        vm.proyectosInvestigaciones = newDataList;
    };

    vm.pInvCheckAll = function () {
        if (!vm.selectedAllP) {
            vm.selectedAllP = true;
        } else {
            vm.selectedAllP = false;
        }
        angular.forEach(vm.proyectosInvestigaciones, function (proyectosInvestigaciones) {
            proyectosInvestigaciones.selected = vm.selectedAllP;
        });
    };
    vm.calculahoras = function (inv) {
        return (inv.horas_semestrales = inv.horas_semanales * 22.5);
    };
};