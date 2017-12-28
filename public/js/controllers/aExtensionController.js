angular.module("iconic").controller("aExtensionCtrl", aExtensionCtrl);

aExtensionCtrl.$inject = ["AEService", "AEFactory", "ptdService", "ptdFactory", "loginFactory", "serviceNotification", "$q"];

function aExtensionCtrl(AEService, AEFactory, ptdService, ptdFactory, loginFactory, serviceNotification, $q) {
    var vm = this;
    var acciones = "";
    cargarAE();
    function cargarAE() {
        loginFactory.cargarEstatus().then(function () {
            AEFactory.buscartActividadesExtension().then(function () {
                vm.actividadesExtension = AEFactory.ExtPro;
            });
            vm.permiso = loginFactory.estatus.permisos.find(function (permiso){
				return permiso.tblRecursoId == 3;
			});
        });
        vm.accion = accion;
        vm.llenarModal = llenarModal;
        vm.vaciarMadal = vaciarMadal;
        vm.deleteActividadesExtension = deleteActividadesExtension;
        vm.formActividadesExtension = {
            nombre_actividad: '',
            fecha_inicio: '',
            fecha_final: '',
            horas_semestrales: '',
            aprobado: '',
            tblPtdId: ''
        }
    }

    function accion() {
        if (acciones == "1") {
            saveActividadesExtension();
        } else {
            editActividadesExtension();
        }
    }

    function saveActividadesExtension() {
        AEService.guardarAE(vm.formActividadesExtension).then(function (res) {
            serviceNotification.success('Actividad guardada correctamente', 3000);
            cargarAE();
        }).catch(function (err) {
            serviceNotification.error('No se guardó la Actividad', 2000);
        });
    }

    function editActividadesExtension() {
        AEService.modificarAE({ donde: vm.formActividadesExtension.id, datos: vm.formActividadesExtension }).then(function (res) {
            serviceNotification.success('Actividad modificada correctamente', 3000);
            cargarAE();
        }).catch(function (err) {
            serviceNotification.error('No se modifico la Actividad', 2000);
        });
    }

    function deleteActividadesExtension(ae) {
        AEService.eliminarAE(ae).then(function (res) {
            serviceNotification.success('Actividad eliminado correctamente', 3000);
            cargarAE();
        }).catch(function (err) {
            serviceNotification.error('No elimino la Actividad', 2000);
        });
    }

    function llenarModal(ae) {
        acciones = "2";
        vm.formActividadesExtension = {
            id: ae.id,
            nombre_actividad: ae.nombre_actividad,
            fecha_inicio: ae.fecha_inicio,
            fecha_final: ae.fecha_final,
            horas_semestrales: ae.horas_semestrales,
            aprobado: ae.aprobado,
            tblPtdId: ptdFactory.ptd.id
        }
    }

    function vaciarMadal() {
        acciones = "1";
        vm.formActividadesExtension = {
            nombre_actividad: '',
            fecha_inicio: '',
            fecha_final: '',
            horas_semestrales: '',
            aprobado: false,
            tblPtdId: ptdFactory.ptd.id
        }
    }
};