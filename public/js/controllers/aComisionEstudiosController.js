angular.module("iconic").controller("aComisionEstudiosCtrl", aComisionEstudiosCtrl);

aComisionEstudiosCtrl.$inject = ["CEService", "CEFactory", "ptdFactory", "loginFactory", "serviceNotification", "$q"];

function aComisionEstudiosCtrl(CEService, CEFactory, ptdFactory, loginFactory, serviceNotification, $q) {
    var vm = this;
    var acciones = "";
    cargarCE();
    function cargarCE() {
        loginFactory.cargarEstatus().then(function () {
            CEFactory.buscarComisionEstudios().then(function () {
                vm.comisionEstudios = CEFactory.ComEst;
            });
            vm.permiso = loginFactory.estatus.permisos.find(function (permiso){
				return permiso.tblRecursoId == 4;
			});
        });
        vm.accion = accion;
        vm.llenarModal = llenarModal;
        vm.vaciarMadal = vaciarMadal;
        vm.deleteComisionEstudios = deleteComisionEstudios;
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

    function accion() {
        if (acciones == "1") {
            saveComisionEstudios();
        } else {
            editComisionEstudios();
        }
    }

    function saveComisionEstudios() {
        CEService.guardarCE(vm.formComisionEstudios).then(function (res) {
            serviceNotification.success('Comision guardada correctamente', 3000);
            cargarCE();
        }).catch(function (err) {
            serviceNotification.error('No se guardó la Comision', 2000);
        });
    }

    function editComisionEstudios() {
        CEService.modificarCE({ donde: vm.formComisionEstudios.id, datos: vm.formComisionEstudios }).then(function (res) {
            serviceNotification.success('Comision modificada correctamente', 3000);
            cargarCE();
        }).catch(function (err) {
            serviceNotification.error('No se modifico la Comision', 2000);
        });
    }

    function deleteComisionEstudios(ce) {
        CEService.eliminarCE(ce).then(function (res) {
            serviceNotification.success('Comision eliminado correctamente', 3000);
            cargarCE();
        }).catch(function (err) {
            serviceNotification.error('No elimino la Comision', 2000);
        });
    }

    function llenarModal(ce) {
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

    function vaciarMadal() {
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