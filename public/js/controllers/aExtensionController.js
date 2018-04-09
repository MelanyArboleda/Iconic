angular.module("iconic").controller("aExtensionCtrl", aExtensionCtrl);

aExtensionCtrl.$inject = ["$rootScope", "AEService", "AEFactory", "ptdService", "ptdFactory", "loginFactory", "serviceNotification", "$q"];

function aExtensionCtrl($rootScope, AEService, AEFactory, ptdService, ptdFactory, loginFactory, serviceNotification, $q) {
    var vm = this;
    var acciones = "";
    if ($rootScope.infoReady == true) {
        cargarAE();
    } else {
        $rootScope.$on("InfoReady", function () {
            cargarAE();
        });
    }
    function cargarAE() {
        AEFactory.buscartActividadesExtension().then(function () {
            vm.actividadesExtension = AEFactory.ExtPro;
        });
        vm.permiso = loginFactory.estatus.permisos.find(function (permiso) {
            return permiso.tblRecursoId == 3;
        });

        vm.formActividadesExtension = {
            nombre_actividad: '',
            fecha_inicio: '',
            fecha_final: '',
            horas_semestrales: '',
            aprobado: '',
            tblPtdId: ''
        }
    }

    vm.accion = function () {
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
            serviceNotification.error('No se pudo guardar la Actividad', 2000);
        });
    }

    function editActividadesExtension() {
        AEService.modificarAE({ donde: vm.formActividadesExtension.id, datos: vm.formActividadesExtension }).then(function (res) {
            serviceNotification.success('Actividad modificada correctamente', 3000);
            cargarAE();
        }).catch(function (err) {
            serviceNotification.error('No se pudo modificar la Actividad', 2000);
        });
    }

    vm.deleteActividadesExtension = function (ae) {
        AEService.eliminarAE(ae).then(function (res) {
            serviceNotification.success('Actividad eliminada correctamente', 3000);
            cargarAE();
        }).catch(function (err) {
            serviceNotification.error('No pudo eliminar la Actividad', 2000);
        });
    }

    vm.llenarModal = function (ae) {
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

    vm.vaciarMadal = function () {
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