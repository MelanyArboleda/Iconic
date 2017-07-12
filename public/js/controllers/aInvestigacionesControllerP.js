angular.module("iconic").controller("aInvestigacionesPCtrl", aInvestigacionesPCtrl);

aInvestigacionesPCtrl.$inject = ["ptdService", "ptdFactory", "serviceNotification", "$q"];

function aInvestigacionesPCtrl(ptdService, ptdFactory, serviceNotification, $q) {
    var vm = this;
    vm.aInvestigacionesP = aInvestigacionesP;
    buscarApartIP();
    function buscarApartIP() {
        ptdFactory.buscarApartIP({ tabla: 'tbl_investigaciones_proyectos', ptd: ptdFactory.ptd.id }).then(function () {
            vm.proyectosInvestigaciones = ptdFactory.ainvestigacionesproyecto;
            for (var i = 0; i < vm.proyectosInvestigaciones.length; i++) {
                if (vm.proyectosInvestigaciones[i].tblVinculoId == 3) {
                    vm.proyectosInvestigaciones[i].tblVinculoId = 'Investigador Principal';
                } else {
                    vm.proyectosInvestigaciones[i].tblVinculoId = 'Co-Investigador';
                }
            }
        });
    }

    function aInvestigacionesP() {
        saveProyectos().then(function () { buscarApartIP(); });
        function saveProyectos() {
            var deferred = $q.defer();
            for (var i = 0; i < vm.proyectosInvestigaciones.length; i++) {
                vm.proyectosInvestigaciones[i].tblPtdId = ptdFactory.ptd.id;
                if (vm.proyectosInvestigaciones[i].tblVinculoId == 'Investigador Principal') {
                    vm.proyectosInvestigaciones[i].tblVinculoId = 3;
                } else {
                    vm.proyectosInvestigaciones[i].tblVinculoId = 4;
                }
                if (vm.proyectosInvestigaciones[i].aprobado == "") {
                    vm.proyectosInvestigaciones[i].aprobado = false;
                }
                data = {
                    datos: vm.proyectosInvestigaciones[i],
                    tabla: 'tbl_investigaciones_proyectos'
                }
                console.log("llama a servicio Save de investigaciones proyectos");
                ptdService.save(data).then(function (resultado) {
                    if (JSON.stringify(resultado) === JSON.stringify(vm.proyectosInvestigaciones[i-1]) || vm.proyectosInvestigaciones[i-1] == undefined) {
                        serviceNotification.success('Apartado guardado correctamente', 3000);
                        deferred.resolve();
                    }
                }).catch(function (err) {
                    console.log(err);
                    deferred.resolve();
                    serviceNotification.error('No se guardó el apartado P', 2000);
                });
            }
            return deferred.promise;
        }
    }

    vm.vinculosP = ['Investigador Principal', 'Co-Investigador'];

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
};