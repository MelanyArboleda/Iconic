angular.module("iconic").controller("fechaEtapaCtrl", fechaEtapaCtrl);

fechaEtapaCtrl.$inject = ["fechaEtapaService", "fechaEtapaFactory", "loginFactory", "serviceNotification"];

function fechaEtapaCtrl(fechaEtapaService, fechaEtapaFactory, loginFactory, serviceNotification) {
    var vm = this;
    var acciones = "";
    cargarFE();
    function cargarFE() {
        fechaEtapaFactory.buscarFechaEtapa().then(function () {
            vm.fechaEtapa = fechaEtapaFactory.fechaEtapa;
            for (var i = 0; i < vm.fechaEtapa.length; i++) {
                // var inico = new Date(vm.fechaEtapa[i].fecha_inicial);
                // var fin = new Date(vm.fechaEtapa[i].fecha_final);
                // vm.fechaEtapa[i].fecha_inicial = inico.getDay() + "/" + inico.getMonth() + "/" + inico.getFullYear();
                // vm.fechaEtapa[i].fecha_final = fin.getDay() + "/" + fin.getMonth() + "/" + fin.getFullYear();
                vm.fechaEtapa[i].tblEtapaId = loginFactory.estatus.etapa.find(function (etapa) {
                    return vm.fechaEtapa[i].tblEtapaId === etapa.id;
                });
                vm.fechaEtapa[i].tblFacultadeId = loginFactory.estatus.facultad;
            }
            vm.accion = accion;
            vm.saveFechaEtapa = saveFechaEtapa;
            vm.editFechaEtapa = editFechaEtapa;
            vm.deleteFechaEtapa = deleteFechaEtapa;
            vm.etapas = loginFactory.estatus.etapa;
            vm.llenarModal = llenarModal;
            vm.vaciarMadal = vaciarMadal;
            año = new Date();
            año = año.getFullYear();
            facultad = loginFactory.estatus.facultad.facultad;
            vm.formfechaEtapa = {
                tblEtapaId: '0',
                tblFacultadeId: facultad,
                semestre: '0',
                ano: año,
                fecha_inicial: '',
                fecha_final: ''
            }
        });
    };

    function accion() {
        vm.formfechaEtapa.tblEtapaId = loginFactory.estatus.etapa.find(function (etapa) {
            return vm.formfechaEtapa.tblEtapaId === etapa.etapa;
        });
        vm.formfechaEtapa.tblEtapaId = vm.formfechaEtapa.tblEtapaId.id;
        vm.formfechaEtapa.tblFacultadeId = loginFactory.estatus.facultad.id;
        if (acciones == "1") {
            saveFechaEtapa();
        } else {
            vm.formfechaEtapa.semestre = vm.formfechaEtapa.semestre;
            editFechaEtapa();
        }
    }

    function saveFechaEtapa() {
        fechaEtapaService.guardarFechaEtapa(vm.formfechaEtapa).then(function (res) {
            cargarFE();
        });
    }

    function editFechaEtapa() {
        donde = {
            tblEtapaId: vm.formfechaEtapa.tblEtapaId,
            tblFacultadeId: vm.formfechaEtapa.tblFacultadeId,
            semestre: vm.formfechaEtapa.semestre,
            ano: vm.formfechaEtapa.ano
        }
        fechaEtapaService.modificarFechaEtapa({ donde: donde, datos: vm.formfechaEtapa }).then(function (res) {
            cargarFE();
        });
    }

    function deleteFechaEtapa(fe) {
        data = {
            tblEtapaId: fe.tblEtapaId.id,
            tblFacultadeId: fe.tblFacultadeId.id,
            semestre: fe.semestre,
            ano: fe.ano
        }
        fechaEtapaService.eliminarFechaEtapa(data).then(function (res) {
            cargarFE();
        });
    }

    function llenarModal(fe) {
        acciones = "2";
        vm.formfechaEtapa = {
            tblEtapaId: fe.tblEtapaId.etapa,
            tblFacultadeId: facultad,
            semestre: fe.semestre.toString(),
            ano: año,
            fecha_inicial: fe.fecha_inicial,
            fecha_final: fe.fecha_final
        }
    }

    function vaciarMadal() {
        acciones = "1";
        vm.formfechaEtapa = {
            tblEtapaId: '0',
            tblFacultadeId: facultad,
            semestre: '0',
            ano: año,
            fecha_inicial: '',
            fecha_final: ''
        }
    }
}    