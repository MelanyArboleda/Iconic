angular.module("iconic").controller("aInvestigacionesSCtrl", aInvestigacionesSCtrl);

aInvestigacionesSCtrl.$inject = ["$rootScope", "ISService", "ISFactory", "ptdService", "ptdFactory", "loginFactory", "DDFactory", "IPFactory", "serviceNotification", "$q"];

function aInvestigacionesSCtrl($rootScope, ISService, ISFactory, ptdService, ptdFactory, loginFactory, DDFactory, IPFactory, serviceNotification, $q) {
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
                calcularHorasDD()
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
            serviceNotification.success('Semillero guardada correctamente', 3000);
            cargarIS();
        }).catch(function (err) {
            serviceNotification.error('No se guardó el semillero', 2000);
        });
    }

    function editInvestigacionesSemilleros() {
        ISService.modificarIS({ donde: vm.formInvestigacionesSemilleros.id, datos: vm.formInvestigacionesSemilleros }).then(function (res) {
            serviceNotification.success('Semillero modificada correctamente', 3000);
            cargarIS();
        }).catch(function (err) {
            serviceNotification.error('No se modifico el semillero', 2000);
        });
    }

    vm.deleteInvestigacionesSemilleros = function (is) {
        ISService.eliminarIS(is).then(function (res) {
            serviceNotification.success('Semillero eliminado correctamente', 3000);
            cargarIS();
        }).catch(function (err) {
            serviceNotification.error('No elimino el semillero', 2000);
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
            horas_semestrales: is.horas_semestrales,
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
                IPFactory.buscarInvestigacionesProyectos().then(function () {
                    var investigacionesProyectos = sumarHoras(IPFactory.InvPro) / 2;
                    var investigacionesSemilleros = sumarHoras(ISFactory.InvSem) / 2;
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