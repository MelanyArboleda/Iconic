angular.module("iconic").controller("aComisionEstudiosCtrl", aComisionEstudiosCtrl);

aComisionEstudiosCtrl.$inject = ["$rootScope", "CEService", "CEFactory", "ptdFactory", "loginFactory", "serviceNotification", "$q"];

function aComisionEstudiosCtrl($rootScope, CEService, CEFactory, ptdFactory, loginFactory, serviceNotification, $q) {
    var vm = this;
    var acciones = "";
    if ($rootScope.infoReady == true) {
        cargarCE();
    } else {
        $rootScope.$on("InfoReady", function () {
            cargarCE();
        });
    }
    function cargarCE() {
        CEFactory.buscarComisionEstudios().then(function () {
            vm.comisionEstudios = CEFactory.ComEst;
        });
        vm.permiso = loginFactory.estatus.permisos.find(function (permiso) {
            return permiso.tblRecursoId == 4;
        });

        vm.formComisionEstudios = {
            universidad: '',
            tipo_estudio: '',
            nombre_estudio: '',
            fecha_inicio: '',
            fecha_graduacion: '',
            fecha_obtencion_autorizacion: '',
            aportes_inst_obtenidos: '',
            tblPtdId: ''
        }
    }

    vm.accion = function () {
        if (acciones == "1") {
            saveComisionEstudios();
        } else {
            editComisionEstudios();
        }
    }

    function saveComisionEstudios() {
        CEService.guardarCE(vm.formComisionEstudios).then(function (res) {
            serviceNotification.success('Comisión guardada correctamente', 3000);
            cargarCE();
        }).catch(function (err) {
            serviceNotification.error('No se pudo guardar la Comisión', 2000);
        });
    }

    function editComisionEstudios() {
        CEService.modificarCE({ donde: vm.formComisionEstudios.id, datos: vm.formComisionEstudios }).then(function (res) {
            serviceNotification.success('Comisión ha sido modificada correctamente', 3000);
            cargarCE();
        }).catch(function (err) {
            serviceNotification.error('No se pudo modificar la Comisión', 2000);
        });
    }

    vm.deleteComisionEstudios = function (ce) {
        CEService.eliminarCE(ce).then(function (res) {
            serviceNotification.success('Comisión eliminado correctamente', 3000);
            cargarCE();
        }).catch(function (err) {
            serviceNotification.error('No se pudo eliminar la Comisión', 2000);
        });
    }

    vm.llenarModal = function (ce) {
        acciones = "2";
        vm.formComisionEstudios = {
            id: ce.id,
            universidad: ce.universidad,
            tipo_estudio: ce.tipo_estudio,
            nombre_estudio: ce.nombre_estudio,
            fecha_inicio: ce.fecha_inicio,
            fecha_graduacion: ce.fecha_graduacion,
            fecha_obtencion_autorizacion: ce.fecha_obtencion_autorizacion,
            aportes_inst_obtenidos: ce.aportes_inst_obtenidos,
            tblPtdId: ptdFactory.ptd.id
        }
    }

    vm.vaciarMadal = function () {
        acciones = "1";
        vm.formComisionEstudios = {
            universidad: '',
            tipo_estudio: '',
            nombre_estudio: '',
            fecha_inicio: '',
            fecha_graduacion: '',
            fecha_obtencion_autorizacion: '',
            aportes_inst_obtenidos: '',
            tblPtdId: ptdFactory.ptd.id
        }
    }
};