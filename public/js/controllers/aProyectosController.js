angular.module("iconic").controller("aProyectosCtrl", aProyectosCtrl);

aProyectosCtrl.$inject = ["FPService", "FPFactory", "ptdService", "ptdFactory", "loginFactory", "serviceNotification", "$q"];

function aProyectosCtrl(FPService, FPFactory, ptdService, ptdFactory, loginFactory, serviceNotification, $q) {
    var vm = this;
    var acciones = "";
    cargarFP();
    function cargarFP() {
        loginFactory.cargarEstatus().then(function () {
            FPFactory.buscarActor().then(function () {
                FPFactory.buscarFormulacionProyectos().then(function () {
                    vm.formulacionProyectos = FPFactory.ForPro;
                    for (var i = 0; i < vm.formulacionProyectos.length; i++) {
                        vm.formulacionProyectos[i].tblActoreId = FPFactory.actores.find(function (actor) {
                            return vm.formulacionProyectos[i].tblActoreId == actor.id;
                        });
                        vm.formulacionProyectos[i].tblActoreId = vm.formulacionProyectos[i].tblActoreId.actor;
                    }
                });
                vm.actores = FPFactory.actores;
            });
        });
        vm.accion = accion;
        vm.llenarModal = llenarModal;
        vm.vaciarMadal = vaciarMadal;
        vm.deleteFormulacionProyectos = deleteFormulacionProyectos;
        vm.formFormulacionProyectos = {
            nombre_articulo: '',
            tblActoreId: '0',
            tema_ppal: '',
            horas_semestrales: '',
            tblPtdId: ''
        }
    }

    function accion() {
        vm.formFormulacionProyectos.tblActoreId = FPFactory.actores.find(function (actor) {
            return vm.formFormulacionProyectos.tblActoreId == actor.actor;
        });
        vm.formFormulacionProyectos.tblActoreId = vm.formFormulacionProyectos.tblActoreId.id;        
        if (acciones == "1") {
            saveFormulacionProyectos();
        } else {
            editFormulacionProyectos();
        }
    }

    function saveFormulacionProyectos() {
        FPService.guardarFP(vm.formFormulacionProyectos).then(function (res) {
            serviceNotification.success('Proyecto guardado correctamente', 3000);
            cargarFP();
        }).catch(function (err) {
            serviceNotification.error('No se guardó el Proyecto', 2000);
        });
    }

    function editFormulacionProyectos() {
        FPService.modificarFP({ donde: vm.formFormulacionProyectos.id, datos: vm.formFormulacionProyectos }).then(function (res) {
            serviceNotification.success('Proyecto modificado correctamente', 3000);
            cargarFP();
        }).catch(function (err) {
            serviceNotification.error('No se modifico la Proyecto', 2000);
        });
    }

    function deleteFormulacionProyectos(fp) {
        FPService.eliminarFP(fp).then(function (res) {
            serviceNotification.success('Proyecto eliminado correctamente', 3000);
            cargarFP();
        }).catch(function (err) {
            serviceNotification.error('No elimino la Proyecto', 2000);
        });
    }

    function llenarModal(fp) {
        acciones = "2";
        vm.formFormulacionProyectos = {
            id: fp.id,
            nombre_articulo: fp.nombre_articulo,
            tblActoreId: fp.tblActoreId,
            tema_ppal: fp.tema_ppal,
            horas_semestrales: fp.horas_semestrales,
            tblPtdId: ptdFactory.ptd.id
        }
    }

    function vaciarMadal() {
        acciones = "1";
        vm.formFormulacionProyectos = {
            nombre_articulo: '',
            tblActoreId: '0',
            tema_ppal: '',
            horas_semestrales: '',
            tblPtdId: ptdFactory.ptd.id
        }
    }
};