angular.module("iconic").controller("aProyectosCtrl", aProyectosCtrl);

aProyectosCtrl.$inject = ["$rootScope", "FPService", "FPFactory", "ptdService", "ptdFactory", "loginFactory", "serviceNotification", "$q", "modalNotifService"];

function aProyectosCtrl($rootScope, FPService, FPFactory, ptdService, ptdFactory, loginFactory, serviceNotification, $q, modalNotifService) {
    var vm = this;
    var acciones = "";
    if ($rootScope.infoReady == true) {
        cargarFP();
    } else {
        $rootScope.$on("InfoReady", function () {
            cargarFP();
        });
    }
    function cargarFP() {
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
        vm.permiso = loginFactory.estatus.permisos.find(function (permiso) {
            return permiso.tblRecursoId == 5;
        });
        vm.formFormulacionProyectos = {
            nombre_articulo: '',
            tblActoreId: '0',
            tema_ppal: '',
            horas_semestrales: '',
            tblPtdId: ''
        }
    }

    vm.accion = function () {
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
            serviceNotification.error('No se pudo guardar el Proyecto', 2000);
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

    vm.deleteFormulacionProyectos = function (fp) {
        modalNotifService.openModal('Esta seguro de eliminar el Proyecto?').then(function (bool) {
            if (bool) {
                FPService.eliminarFP(fp).then(function (res) {
                    serviceNotification.success('Proyecto eliminado correctamente', 3000);
                    cargarFP();
                }).catch(function (err) {
                    serviceNotification.error('No pudo eliminar el Proyecto', 2000);
                });
            }
        });
    }

    vm.llenarModal = function (fp) {
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

    vm.vaciarMadal = function () {
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