angular.module("iconic").controller("aInvestigacionesSCtrl", aInvestigacionesSCtrl);

aInvestigacionesSCtrl.$inject = ["$rootScope", "ISService", "ISFactory", "ptdService", "ptdFactory", "loginFactory", "DDFactory", "IPFactory", "serviceNotification", "$q", "modalNotifService"];

function aInvestigacionesSCtrl($rootScope, ISService, ISFactory, ptdService, ptdFactory, loginFactory, DDFactory, IPFactory, serviceNotification, $q, modalNotifService) {
    var vm = this;
    var acciones = "";
    var max;
    var min;
    if ($rootScope.infoReady == true) {
        cargarIS();
    } else {
        $rootScope.$on("InfoReady", function () {
            cargarIS();
        });
    }
    function cargarIS() {
        ISFactory.buscarVinculosS().then(function () {
            ISFactory.buscarInvestigacionesSemilleros().then(function () {
                vm.investigacionesSemilleros = ISFactory.InvSem;
                for (var i = 0; i < vm.investigacionesSemilleros.length; i++) {
                    vm.investigacionesSemilleros[i].tblVinculoId = ISFactory.vinculos.find(function (vinculo) {
                        return vm.investigacionesSemilleros[i].tblVinculoId == vinculo.id;
                    });
                    vm.investigacionesSemilleros[i].tblVinculoId = vm.investigacionesSemilleros[i].tblVinculoId.vinculo;
                    vm.investigacionesSemilleros[i].horas_semestrales = calculahoras(vm.investigacionesSemilleros[i].horas_semanales);
                }
            });
            vm.vinculos = ISFactory.vinculos;
        });
        vm.permiso = loginFactory.estatus.permisos.find(function (permiso) {
            return permiso.tblRecursoId == 2;
        });

        vm.formInvestigacionesSemilleros = {
            nombre_semillero: '',
            tblVinculoId: '0',
            actividad_desarrollada: '',
            producto: '',
            horas_semanales: '',
            horas_semestrales: '',
            aprobado: '',
            tblPtdId: ''
        }
    }

    vm.accion = function () {
        vm.formInvestigacionesSemilleros.tblVinculoId = ISFactory.vinculos.find(function (vinculo) {
            return vm.formInvestigacionesSemilleros.tblVinculoId == vinculo.vinculo;
        });
        vm.formInvestigacionesSemilleros.tblVinculoId = vm.formInvestigacionesSemilleros.tblVinculoId.id;
        if (acciones == "1") {
            saveInvestigacionesSemilleros();
        } else {
            editInvestigacionesSemilleros();
        }
    }

    function saveInvestigacionesSemilleros() {
        ISService.guardarIS(vm.formInvestigacionesSemilleros).then(function (res) {
            serviceNotification.success('Semillero guardado correctamente', 3000);
            cargarIS();
        }).catch(function (err) {
            serviceNotification.error('No se pudo guardar el semillero', 2000);
        });
    }

    function editInvestigacionesSemilleros() {
        ISService.modificarIS({ donde: vm.formInvestigacionesSemilleros.id, datos: vm.formInvestigacionesSemilleros }).then(function (res) {
            serviceNotification.success('Semillero modificado correctamente', 3000);
            cargarIS();
        }).catch(function (err) {
            serviceNotification.error('No se pudo modificar el semillero', 2000);
        });
    }

    vm.deleteInvestigacionesSemilleros = function (is) {
        modalNotifService.openModal('Esta seguro de eliminar el Semillero de investigación?').then(function (bool) {
            if (bool) {
                ISService.eliminarIS(is).then(function (res) {
                    serviceNotification.success('Semillero eliminado correctamente', 3000);
                    cargarIS();
                }).catch(function (err) {
                    serviceNotification.error('No se pudo eliminar el semillero', 2000);
                });
            }
        });
    }

    vm.llenarModal = function (is) {
        acciones = "2";
        vm.formInvestigacionesSemilleros = {
            id: is.id,
            nombre_semillero: is.nombre_semillero,
            tblVinculoId: is.tblVinculoId,
            actividad_desarrollada: is.actividad_desarrollada,
            producto: is.producto,
            horas_semanales: is.horas_semanales,
            horas_semestrales: calculahoras(is.horas_semanales),
            aprobado: is.aprobado,
            tblPtdId: is.tblPtdId
        }
    }

    vm.vaciarMadal = function () {
        acciones = "1";
        vm.formInvestigacionesSemilleros = {
            nombre_semillero: '',
            tblVinculoId: '0',
            actividad_desarrollada: '',
            producto: '',
            horas_semanales: '',
            horas_semestrales: '',
            aprobado: false,
            tblPtdId: ptdFactory.ptd.id
        }
    }

    vm.asignarData = function (data) {
        vm.formInvestigacionesSemilleros.horas_semestrales = calculahoras(data);
    }

    function calculahoras(horas_semanales) {
        return horas_semanales * 22.5;
    };

    (function () {
        if (loginFactory.user.dedicacion == 1) { min = 14; max = 18; }
        else if (loginFactory.user.dedicacion == 2) { min = 10; max = 14; }
        else if (loginFactory.user.dedicacion == 3) { min = 12; max = 18; }
        else { min = 8; max = 10; }
    })();
};