angular.module("iconic").controller("aAsesoriasCtrl", aAsesoriasCtrl);

aAsesoriasCtrl.$inject = ["APService", "APFactory", "ptdFactory", "loginFactory", "serviceNotification", "$q"];

function aAsesoriasCtrl(APService, APFactory, ptdFactory, loginFactory, serviceNotification, $q) {
    var vm = this;
    var acciones = "";
    cargaAP();
    function cargaAP() {
        loginFactory.cargarEstatus().then(function () {
            APFactory.buscarAsesoriasProyectos().then(function () {
                vm.asesoriasProyectos = APFactory.AsePro;
            });
            vm.permiso = loginFactory.estatus.permisos.find(function (permiso){
				return permiso.tblRecursoId == 6;
			});
        });
        vm.accion = accion;
        vm.llenarModal = llenarModal;
        vm.vaciarMadal = vaciarMadal;
        vm.deleteAsesoriasProyectos = deleteAsesoriasProyectos;
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

    function accion() {
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

    function deleteAsesoriasProyectos(ap) {
        APService.eliminarAP(ap).then(function (res) {
            serviceNotification.success('Asesoria eliminado correctamente', 3000);
            cargaAP();
        }).catch(function (err) {
            serviceNotification.error('No elimino la Asesoria', 2000);
        });
    }

    function llenarModal(ap) {
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

    function vaciarMadal() {
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