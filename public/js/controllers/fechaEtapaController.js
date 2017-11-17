angular.module("iconic").controller("fechaEtapaCtrl", fechaEtapaCtrl);

fechaEtapaCtrl.$inject = ["fechaEtapaService", "fechaEtapaFactory", "loginFactory", "serviceNotification"];

function fechaEtapaCtrl(fechaEtapaService, fechaEtapaFactory, loginFactory, serviceNotification) {
    var vm = this;
    cargarFE();
    function cargarFE() {
        fechaEtapaFactory.buscarFechaEtapa().then(function () {
            vm.fechaEtapa = fechaEtapaFactory.fechaEtapa;
            for (var i = 0; i < vm.fechaEtapa.length; i++) {
                var inico = new Date(vm.fechaEtapa[i].fecha_inicial);
                var fin = new Date(vm.fechaEtapa[i].fecha_final);
                vm.fechaEtapa[i].fecha_inicial = inico.getDay() + "/" + inico.getMonth() + "/" + inico.getFullYear();
                vm.fechaEtapa[i].fecha_final = fin.getDay() + "/" + fin.getMonth() + "/" + fin.getFullYear();
                vm.fechaEtapa[i].tblEtapaId = loginFactory.estatus.etapa.find(function (etapa) {
                    return vm.fechaEtapa[i].tblEtapaId === etapa.id;
                });
                vm.fechaEtapa[i].tblFacultadeId = loginFactory.estatus.facultad;
            }
            vm.saveFechaEtapa = saveFechaEtapa;
            vm.etapas = loginFactory.estatus.etapa;
            año = new Date();
            año = año.getFullYear();
            facultad = loginFactory.estatus.facultad.facultad;
            vm.formfechaEtapa = {
                tblEtapaId: '',
                tblFacultadeId: facultad,
                semestre: '',
                ano: año,
                fecha_inicial: '',
                fecha_final: ''
            }
        });
    };

    function saveFechaEtapa() {
        vm.formfechaEtapa.tblEtapaId = loginFactory.estatus.etapa.find(function (etapa) {
            return vm.formfechaEtapa.tblEtapaId === etapa.etapa;
        });
        vm.formfechaEtapa.tblEtapaId = vm.formfechaEtapa.tblEtapaId.id;
        vm.formfechaEtapa.tblFacultadeId = loginFactory.estatus.facultad.id;
        fechaEtapaService.guardarFechaEtapa(vm.formfechaEtapa).then(function (res) {
            cargarFE();
        });
    }
}    