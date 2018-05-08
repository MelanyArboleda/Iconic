angular.module("iconic").controller("aInvestigacionesPCtrl", aInvestigacionesPCtrl);

aInvestigacionesPCtrl.$inject = ["$rootScope", "IPService", "IPFactory", "ptdService", "ptdFactory", "loginFactory", "DDFactory", "ISFactory", "serviceNotification", "$q", "modalNotifService"];

function aInvestigacionesPCtrl($rootScope, IPService, IPFactory, ptdService, ptdFactory, loginFactory, DDFactory, ISFactory, serviceNotification, $q, modalNotifService) {
    var vm = this;
    var acciones = "";
    var max;
    var min;
    if ($rootScope.infoReady == true) {
        cargarIP();
    } else {
        $rootScope.$on("InfoReady", function () {
            cargarIP();
        });
    }
    function cargarIP() {
        IPFactory.buscarVinculosP().then(function () {
            IPFactory.buscarInvestigacionesProyectos().then(function () {
                vm.investigacionesProyectos = IPFactory.InvPro;
                for (var i = 0; i < vm.investigacionesProyectos.length; i++) {
                    vm.investigacionesProyectos[i].tblVinculoId = IPFactory.vinculos.find(function (vinculo) {
                        return vm.investigacionesProyectos[i].tblVinculoId == vinculo.id;
                    });
                    vm.investigacionesProyectos[i].tblVinculoId = vm.investigacionesProyectos[i].tblVinculoId.vinculo;
                    vm.investigacionesProyectos[i].horas_semestrales = calculahoras(vm.investigacionesProyectos[i].horas_semanales);
                }
            });
            vm.vinculos = IPFactory.vinculos;
        });
        vm.permiso = loginFactory.estatus.permisos.find(function (permiso) {
            return permiso.tblRecursoId == 2;
        });

        vm.formInvestigacionesProyectos = {
            nombre_proyecto: '',
            tblVinculoId: '0',
            objetivo_principal: '',
            producto: '',
            horas_semanales: '',
            horas_semestrales: '',
            aprobado: '',
            tblPtdId: ''
        }
    }

    vm.accion = function () {
        vm.formInvestigacionesProyectos.tblVinculoId = IPFactory.vinculos.find(function (vinculo) {
            return vm.formInvestigacionesProyectos.tblVinculoId == vinculo.vinculo;
        });
        vm.formInvestigacionesProyectos.tblVinculoId = vm.formInvestigacionesProyectos.tblVinculoId.id;
        if (acciones == "1") {
            saveInvestigacionesProyectos();
        } else {
            editInvestigacionesProyectos();
        }
    }

    function saveInvestigacionesProyectos() {
        IPService.guardarIP(vm.formInvestigacionesProyectos).then(function (res) {
            serviceNotification.success('Proyecto guardado correctamente', 3000);
            cargarIP();
        }).catch(function (err) {
            serviceNotification.error('No se pudo guardar el proyecto', 2000);
        });
    }

    function editInvestigacionesProyectos() {
        IPService.modificarIP({ donde: vm.formInvestigacionesProyectos.id, datos: vm.formInvestigacionesProyectos }).then(function (res) {
            serviceNotification.success('Proyecto modificado correctamente', 3000);
            cargarIP();
        }).catch(function (err) {
            serviceNotification.error('No se pudo modificar el proyecto', 2000);
        });
    }

    vm.deleteInvestigacionesProyectos = function (ip) {
        modalNotifService.openModal('Esta seguro de eliminar el Proyecto de investigación?').then(function (bool) {
            if (bool) {
                IPService.eliminarIP(ip).then(function (res) {
                    serviceNotification.success('Proyecto eliminado correctamente', 3000);
                    cargarIP();
                }).catch(function (err) {
                    serviceNotification.error('No se pudo eliminar el proyecto', 2000);
                });
            }
        });
    }

    vm.llenarModal = function (ip) {
        acciones = "2";
        vm.formInvestigacionesProyectos = {
            id: ip.id,
            nombre_proyecto: ip.nombre_proyecto,
            tblVinculoId: ip.tblVinculoId,
            objetivo_principal: ip.objetivo_principal,
            producto: ip.producto,
            horas_semanales: ip.horas_semanales,
            horas_semestrales: calculahoras(ip.horas_semanales),
            aprobado: ip.aprobado,
            tblPtdId: ip.tblPtdId
        }
    }

    vm.vaciarMadal = function () {
        acciones = "1";
        vm.formInvestigacionesProyectos = {
            nombre_proyecto: '',
            tblVinculoId: '0',
            objetivo_principal: '',
            producto: '',
            horas_semanales: '',
            horas_semestrales: '',
            aprobado: false,
            tblPtdId: ptdFactory.ptd.id
        }
    }

    vm.asignarData = function (data) {
        vm.formInvestigacionesProyectos.horas_semestrales = calculahoras(data);
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