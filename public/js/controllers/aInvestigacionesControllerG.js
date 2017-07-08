angular.module("iconic").controller("aInvestigacionesGCtrl", aInvestigacionesGCtrl);

aInvestigacionesGCtrl.$inject = ["ptdService", "ptdFactory", "serviceNotification", "$q"];

function aInvestigacionesGCtrl(ptdService, ptdFactory, serviceNotification, $q) {
    var vm = this;
    vm.aInvestigacionesG = aInvestigacionesG;
    buscarApartIG();
    
    function buscarApartIG() {
        ptdFactory.buscarApartIG({ tabla: 'tbl_investigaciones_semilleros', ptd: ptdFactory.ptd.id }).then(function () {
            vm.gruposInvestigaciones = ptdFactory.ainvestigacionesgrupo;
            for (var i = 0; i < vm.gruposInvestigaciones.length; i++) {
                if (vm.gruposInvestigaciones[i].tblVinculoId == 1) {
                    vm.gruposInvestigaciones[i].tblVinculoId = 'Director';
                } else {
                    vm.gruposInvestigaciones[i].tblVinculoId = 'Miembro';
                }
            }
        });
    }

    function aInvestigacionesG() {
        saveGrupos().then(function () { buscarApartIG(); });
        function saveGrupos() {
            var deferred = $q.defer();
            for (var i = 0; i < vm.gruposInvestigaciones.length; i++) {
                vm.gruposInvestigaciones[i].tblPtdId = ptdFactory.ptd.id;
                if (vm.gruposInvestigaciones[i].tblVinculoId == 'Director') {
                    vm.gruposInvestigaciones[i].tblVinculoId = 1;
                } else {
                    vm.gruposInvestigaciones[i].tblVinculoId = 2;
                }
                if (vm.gruposInvestigaciones[i].aprobado == "") {
                    vm.gruposInvestigaciones[i].aprobado = false;
                }

                data = {
                    datos: vm.gruposInvestigaciones[i],
                    tabla: 'tbl_investigaciones_semilleros'
                }
                console.log("llama a servicio Save de investigaciones semilleros");
                ptdService.save(data).then(function (resultado) {
                    serviceNotification.success('Apartado guardado correctamente', 3000);
                }).catch(function (err) {
                    console.log(err);
                    serviceNotification.error('No se guardó el apartado', 2000);
                });
            }
            if (i == vm.gruposInvestigaciones.length) {
                deferred.resolve();
                return deferred.promise;
            }
        }
    }

    vm.vinculosG = ['Director', 'Miembro'];

    vm.gInvAddNew = function (gI) {
        vm.gruposInvestigaciones.push({
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
        angular.forEach(vm.gruposInvestigaciones, function (selectedG) {
            if (!selectedG.selectedG) {
                newDataList.push(selectedG);
            }
        });
        vm.gruposInvestigaciones = newDataList;
    };

    vm.gInvcheckAll = function () {
        if (!vm.selectedAllG) {
            vm.selectedAllG = true;
        } else {
            vm.selectedAllG = false;
        }
        angular.forEach(vm.gruposInvestigaciones, function (gruposInvestigaciones) {
            gruposInvestigaciones.selected = vm.selectedAllG;
        });
    };
};