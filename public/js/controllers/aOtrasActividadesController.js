angular.module("iconic").controller("aOtrasActividadesCtrl", aOtrasActividadesCtrl);

aOtrasActividadesCtrl.$inject = ["$rootScope", "OAFactory", "OAService", "RGFactory", "RGService", "ptdFactory", "loginFactory", "serviceNotification", "$q"];

function aOtrasActividadesCtrl($rootScope, OAFactory, OAService, RGFactory, RGService, ptdFactory, loginFactory, serviceNotification, $q) {
    var vm = this;
    var acciones = "";
    var max;
    var mes;

    if ($rootScope.infoReady == true) {
        cargarData();
    } else {
        $rootScope.$on("InfoReady", function () {
            cargarData();
        });
    }

    function cargarData() {
        RGFactory.modificarResumenGeneral().then(function () {
            RGFactory.buscarResumenGeneral().then(function () {
                if (loginFactory.perfil.id == 2) {
                    if(RGFactory.ResGen.totalHorasSemestre != mes){
                        serviceNotification.warning('Las horas no coninciden con las horas establecidad por el estatuto', 2000);
                    }
                }
                OAFactory.buscarOtrasActividades(RGFactory.ResGen.id).then(function () {
                    vm.otrasActividades = OAFactory.OtrAct;
                    for (var i = 0; i < vm.otrasActividades.length; i++) {
                        vm.otrasActividades[i].horas_semestrales = calculahoras(vm.otrasActividades[i].horas_semanales);
                    }
                });
                vm.resumenGeneral = RGFactory.ResGen;
            });
        });
        vm.permiso = loginFactory.estatus.permisos.find(function (permiso) {
            return permiso.tblRecursoId == 7;
        });

        vm.formOtrasActividades = {
            nombre_actividad: '',
            horas_semanales: '',
            horas_semestrales: '',
            descripcion_productos: '',
            tblResumeneId: ''
        }
    }

    vm.accion = function () {
        if (acciones == "1") {
            saveOtrasActividades();
        } else {
            editOtrasActividades();
        }
    }

    function saveOtrasActividades() {
        OAService.guardarOA(vm.formOtrasActividades).then(function (res) {
            serviceNotification.success('Actividad guardada correctamente', 3000);
            cargarData();
        }).catch(function (err) {
            serviceNotification.error('No se guardó la Actividad', 2000);
        });
    }

    function editOtrasActividades() {
        OAService.modificarOA({ donde: vm.formOtrasActividades.id, datos: vm.formOtrasActividades }).then(function (res) {
            serviceNotification.success('Actividad modificada correctamente', 3000);
            cargarData();
        }).catch(function (err) {
            serviceNotification.error('No se modifico la Actividad', 2000);
        });
    }

    vm.deleteOtrasActividades = function (oa) {
        OAService.eliminarOA(oa).then(function (res) {
            serviceNotification.success('Actividad eliminado correctamente', 3000);
            cargarData();
        }).catch(function (err) {
            serviceNotification.error('No elimino la Actividad', 2000);
        });
    }

    vm.saveObservaciones = function (Observacion) {
        RGService.modificarRG(vm.resumenGeneral).then(function (res) {
            serviceNotification.success('Observación guardada correctamente', 3000);
            cargarData();
        }).catch(function (err) {
            serviceNotification.error('No se guardó la Observación', 2000);
        });
    }

    vm.llenarModal = function (oa) {
        acciones = "2";
        vm.formOtrasActividades = {
            id: oa.id,
            nombre_actividad: oa.nombre_actividad,
            horas_semanales: oa.horas_semanales,
            horas_semestrales: oa.horas_semestrales,
            descripcion_productos: oa.descripcion_productos,
            tblResumeneId: RGFactory.ResGen.id
        }
    }

    vm.vaciarMadal = function () {
        acciones = "1";
        vm.formOtrasActividades = {
            nombre_actividad: '',
            horas_semanales: '',
            horas_semestrales: '',
            descripcion_productos: '',
            tblResumeneId: RGFactory.ResGen.id
        }
    }

    vm.asignarData = function (data) {
        vm.formOtrasActividades.horas_semestrales = calculahoras(data);
    }

    function calculahoras(horas_semanales) {
        return horas_semanales * 18;
    };

    (function () {
        if (loginFactory.user.dedicacion == 1) { mes = 900 }
        else if (loginFactory.user.dedicacion == 2) { mes = 450 }
        else if (loginFactory.user.dedicacion == 3) { mes = 900 }
        else { mes = 450 }
    })();
};