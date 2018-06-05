angular.module("iconic").controller("aAsesoriasCtrl", aAsesoriasCtrl);

aAsesoriasCtrl.$inject = ["$rootScope", "APService", "APFactory", "ptdFactory", "loginFactory", "serviceNotification", "$q", "modalNotifService"];

function aAsesoriasCtrl($rootScope, APService, APFactory, ptdFactory, loginFactory, serviceNotification, $q, modalNotifService) {
    var vm = this;
    var acciones = "";
    if ($rootScope.infoReady == true) {
        cargarAP();
    } else {
        $rootScope.$on("InfoReady", function () {
            cargarAP();
        });
    }
    function cargarAP() {
        APFactory.buscarAsesoriasProyectos().then(function () {
            vm.asesoriasProyectos = APFactory.AsePro;
        });
        vm.permiso = loginFactory.estatus.permisos.find(function (permiso) {
            return permiso.tblRecursoId == 6;
        });
        vm.formAsesoriasProyectos = {
            integrantes: '',
            titulo: '',
            aspectos: '',
            horas_semestrales: '',
            estudiante: '',
            jefe: '',
            tblPtdId: ''
        }
    }

    vm.accion = function () {
        if (acciones == "1") {
            saveAsesoriasProyectos();
        } else {
            editAsesoriasProyectos();
        }
    }

    function saveAsesoriasProyectos() {
        APService.guardarAP(vm.formAsesoriasProyectos).then(function (res) {
            serviceNotification.success('Asesoría guardada correctamente', 4000);
            cargarAP();
        }).catch(function (err) {
            serviceNotification.error('No se guardó la Asesoría', 5000);
        });
    }

    function editAsesoriasProyectos() {
        APService.modificarAP({ donde: vm.formAsesoriasProyectos.id, datos: vm.formAsesoriasProyectos }).then(function (res) {
            serviceNotification.success('Asesoría ha sido modificada correctamente', 4000);
            cargarAP();
        }).catch(function (err) {
            serviceNotification.error('No se pudo modificar la Asesoría', 5000);
        });
    }

    vm.deleteAsesoriasProyectos = function (ap) {
        modalNotifService.openModal('Esta seguro de eliminar la asesoría?').then(function (bool) {
            if (bool) {
                APService.eliminarAP(ap).then(function (res) {
                    serviceNotification.success('Asesoría eliminada correctamente', 4000);
                    cargarAP();
                }).catch(function (err) {
                    serviceNotification.error('No se pudo eliminar la Asesoría', 5000);
                });
            }
        });
    }

    vm.llenarModal = function (ap) {
        acciones = "2";
        vm.formAsesoriasProyectos = {
            id: ap.id,
            integrantes: ap.integrantes,
            titulo: ap.titulo,
            aspectos: ap.aspectos,
            horas_semestrales: ap.horas_semestrales,
            estudiante: ap.estudiante,
            jefe: ap.jefe,
            tblPtdId: ptdFactory.ptd.id
        }
    }

    vm.vaciarMadal = function () {
        acciones = "1";
        vm.formAsesoriasProyectos = {
            integrantes: '',
            titulo: '',
            aspectos: '',
            horas_semestrales: '',
            estudiante: '',
            jefe: '',
            tblPtdId: ptdFactory.ptd.id
        }
    }
};