angular.module("iconic").controller("aInvestigacionesPCtrl", aInvestigacionesPCtrl);

aInvestigacionesPCtrl.$inject = ["$rootScope", "IPService", "IPFactory", "ptdService", "ptdFactory", "loginFactory", "DDFactory", "ISFactory", "serviceNotification", "$q"];

function aInvestigacionesPCtrl($rootScope, IPService, IPFactory, ptdService, ptdFactory, loginFactory, DDFactory, ISFactory, serviceNotification, $q) {
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
                calcularHorasDD()
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
            serviceNotification.success('Proyecto guardada correctamente', 3000);
            cargarIP();
        }).catch(function (err) {
            serviceNotification.error('No se guardó el proyecto', 2000);
        });
    }

    function editInvestigacionesProyectos() {
        IPService.modificarIP({ donde: vm.formInvestigacionesProyectos.id, datos: vm.formInvestigacionesProyectos }).then(function (res) {
            serviceNotification.success('Proyecto modificada correctamente', 3000);
            cargarIP();
        }).catch(function (err) {
            serviceNotification.error('No se modifico el proyecto', 2000);
        });
    }

    vm.deleteInvestigacionesProyectos = function (ip) {
        IPService.eliminarIP(ip).then(function (res) {
            serviceNotification.success('Proyecto eliminado correctamente', 3000);
            cargarIP();
        }).catch(function (err) {
            serviceNotification.error('No elimino el proyecto', 2000);
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
            horas_semestrales: ip.horas_semestrales,
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

    function calcularHorasDD() {
        DDFactory.buscarMaterias().then(function () {
            DDFactory.buscarDocenciaDirecta().then(function () {
                var docenciaDirecta = DDFactory.DocDir;
                for (var i = 0; i < docenciaDirecta.length; i++) {
                    docenciaDirecta[i].horas_semanales = DDFactory.materias.find(function (materia) {
                        return docenciaDirecta[i].tblMateriaCodigo == materia.codigo;
                    });
                    docenciaDirecta[i].horas_semanales = docenciaDirecta[i].horas_semanales.horas_semanales;
                }
                docenciaDirecta = sumarHoras(DDFactory.DocDir);
                ISFactory.buscarInvestigacionesSemilleros().then(function () {
                    var investigacionesSemilleros = sumarHoras(ISFactory.InvSem) / 2;
                    var investigacionesProyectos = sumarHoras(IPFactory.InvPro) / 2;
                    var docDicCompleta = docenciaDirecta + investigacionesProyectos + investigacionesSemilleros;
                    if (max < docDicCompleta) {
                        serviceNotification.warning('la suma de las horas de docencia directa y sus asimilables es mayor a la requerida', 2000);
                    } else {
                        if (min > docDicCompleta && loginFactory.perfil.id == 2) {
                            serviceNotification.warning('la suma de las horas de docencia directa y sus asimilables es menor a la requerida', 2000);
                        }
                    }
                });
            });
        });
    }

    function sumarHoras(array) {
        var suma = 0;
        for (i = 0; i < array.length; i++) {
            suma += array[i].horas_semanales
        }
        return suma;
    }

    (function () {
        if (loginFactory.user.dedicacion == 1) { min = 14; max = 18; }
        else if (loginFactory.user.dedicacion == 2) { min = 10; max = 14; }
        else if (loginFactory.user.dedicacion == 3) { min = 12; max = 18; }
        else { min = 8; max = 10; }
    })();
};