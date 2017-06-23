angular.module("iconic").controller("aInvestigacionesCtrl", aInvestigacionesCtrl);

aInvestigacionesCtrl.$inject = ["ptdService", "ptdFactory", "serviceNotification"];

function aInvestigacionesCtrl(ptdService, ptdFactory, serviceNotification) {
    var vm = this;
    vm.aInvestigaciones = aInvestigaciones;
    vm.gruposInvestigaciones = ptdFactory.ainvestigacionesgrupo;;
    vm.proyectosInvestigaciones = ptdFactory.ainvestigacionesproyecto;;

    for (var i = 0; i < vm.gruposInvestigaciones.length; i++) {
    if (vm.gruposInvestigaciones[i].tblVinculoId == 1) {
        vm.gruposInvestigaciones[i].tblVinculoId = 'Director';
    } else {
        vm.gruposInvestigaciones[i].tblVinculoId = 'Miembro';
    }}

    for (var i = 0; i < vm.proyectosInvestigaciones.length; i++) {
     if (vm.proyectosInvestigaciones[i].tblVinculoId == 3) {
        vm.proyectosInvestigaciones[i].tblVinculoId = 'Investigador Ppal';
    } else {
        vm.proyectosInvestigaciones[i].tblVinculoId = 'Co-Investigador';
    }}
    function aInvestigaciones() {
        for (var i = 0; i < vm.gruposInvestigaciones.length; i++) {
            vm.gruposInvestigaciones[i].tblPtdId = ptdFactory.ptd.id;
            if (vm.gruposInvestigaciones[i].tblVinculoId == 'Director') {
                vm.gruposInvestigaciones[i].tblVinculoId = 1;
            } else {
                vm.gruposInvestigaciones[i].tblVinculoId = 2;
            }
            if(vm.gruposInvestigaciones[i].aprobado == ""){
                vm.gruposInvestigaciones[i].aprobado = false;
            }
             
            data = {
                datos: vm.gruposInvestigaciones[i],
                tabla: 'tbl_invertigaciones_semilleros'
            }
            console.log("llama a servicio Save de investigaciones semilleros");
            ptdService.save(data).then(function (resultado) {
                ptdFactory.ainvestigacionesgrupo[resultado.apartado.id - 1] = resultado.apartado;
                console.log(resultado);
                serviceNotification.success('Apartado guardado correctamente', 2000);
            }).catch(function (err) {
                console.log(err);
                serviceNotification.error('No se guardó el apartado', 2000);
            });
        }
        for (var i = 0; i < vm.proyectosInvestigaciones.length; i++) {
            vm.proyectosInvestigaciones[i].tblPtdId = ptdFactory.ptd.id;
            if (vm.proyectosInvestigaciones[i].tblVinculoId == 'Investigador Ppal') {
                vm.proyectosInvestigaciones[i].tblVinculoId = 3;
            } else {
                vm.proyectosInvestigaciones[i].tblVinculoId = 4;
            }
            if(vm.proyectosInvestigaciones[i].aprobado == ""){
                vm.proyectosInvestigaciones[i].aprobado = false;
            }
            data = {
                datos: vm.proyectosInvestigaciones[i],
                tabla: 'tbl_invertigaciones_proyectos'
            }
            console.log("llama a servicio Save de investigaciones proyectos");
            ptdService.save(data).then(function (resultado) {
                ptdFactory.ainvestigacionesproyecto[resultado.apartado.id - 1] = resultado.apartado;
                console.log(resultado);
            }).catch(function (err) {
                console.log(err);
                serviceNotification.error('Error . ', 2000);
            });
        }
    }


    vm.vinculosG = ['Director', 'Miembro'];
    vm.vinculosP = ['Investigador Ppal', 'Co-Investigador'];

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

    vm.pInvAddNew = function (proyectosInvestigaciones) {
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