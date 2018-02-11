angular.module("iconic").controller("aAsesoriasCtrl", aAsesoriasCtrl);

aAsesoriasCtrl.$inject = ["$rootScope", "APService", "APFactory", "ptdFactory", "loginFactory", "serviceNotification", "$q"];

function aAsesoriasCtrl($rootScope, APFactory, ptdFactory, loginFactory, serviceNotification, $q) {
    var vm = this;
    var acciones = "";
    if ($rootScope.infoReady == true) {
        cargaAP();
    } else {
        $rootScope.$on("InfoReady", function () {
            cargaAP();
        });
    }
    function cargaAP() {
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
            serviceNotification.success('Asesoria guardada correctamente', 3000);
            cargaAP();
        }).catch(function (err) {
            serviceNotification.error('No se guardó la Asesoria', 2000);
        });
    }

    function editAsesoriasProyectos() {
        APService.modificarAP({ donde: vm.formAsesoriasProyectos.id, datos: vm.formAsesoriasProyectos }).then(function (res) {
            serviceNotification.success('Asesoria modificada correctamente', 3000);
            cargaAP();
        }).catch(function (err) {
            serviceNotification.error('No se modifico la Asesoria', 2000);
        });
    }

    vm.deleteAsesoriasProyectos = function (ap) {
        APService.eliminarAP(ap).then(function (res) {
            serviceNotification.success('Asesoria eliminado correctamente', 3000);
            cargaAP();
        }).catch(function (err) {
            serviceNotification.error('No elimino la Asesoria', 2000);
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