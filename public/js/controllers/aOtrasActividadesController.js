angular.module("iconic").controller("aOtrasActividadesCtrl", aOtrasActividadesCtrl);

aOtrasActividadesCtrl.$inject = ["$rootScope", "OAFactory", "OAService", "RGFactory", "RGService", "ptdFactory", "loginFactory", "serviceNotification", "$q", "modalNotifService"];

function aOtrasActividadesCtrl($rootScope, OAFactory, OAService, RGFactory, RGService, ptdFactory, loginFactory, serviceNotification, $q, modalNotifService) {
    var vm = this;
    var acciones = "";
    var max;
    var mes;
    vm.actCnx = [
        "ATENCIÓN ESTUDIANTES", "PREPARACIÓN DE CLASES", "CALIFICACIONES DE EXÁMENES"
    ]

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
                    if (RGFactory.ResGen.horas_semestrales_tot != mes) {
                        modalNotifService.openModal('Las horas no coinciden con las horas establecidas por el Estatuto Docente');
                    }
                }
                OAFactory.buscarOtrasActividades(RGFactory.ResGen.id).then(function () {
                    vm.otrasActividades = OAFactory.OtrAct;
                    for (var i = 0; i < vm.otrasActividades.length; i++) {
                        vm.otrasActividades[i].horas_semestrales = calculahoras(vm.otrasActividades[i].horas_semanales);
                        if (i+1 == vm.otrasActividades.length) {
                            vm.actCnx = [
                                "ATENCIÓN ESTUDIANTES", "PREPARACIÓN DE CLASES", "CALIFICACIONES DE EXÁMENES"
                            ]
                            actuliazarselect();   
                        }
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
        var hcx = horasConexas();
        if (vm.formOtrasActividades.nombre_actividad == "ATENCIÓN ESTUDIANTES" ||
            vm.formOtrasActividades.nombre_actividad == "PREPARACIÓN DE CLASES" ||
            vm.formOtrasActividades.nombre_actividad == "CALIFICACIONES DE EXÁMENES") {
            if (vm.formOtrasActividades.horas_semanales + hcx <= RGFactory.horasCnx) {
                OAService.guardarOA(vm.formOtrasActividades).then(function (res) {
                    serviceNotification.success('Actividad guardada correctamente', 3000);
                    // if (vm.formOtrasActividades.nombre_actividad == "ATENCIÓN ESTUDIANTES" ||
                    //     vm.formOtrasActividades.nombre_actividad == "PREPARACIÓN DE CLASES" ||
                    //     vm.formOtrasActividades.nombre_actividad == "CALIFICACIONES DE EXÁMENES") {
                    //     var pos = vm.actCnx.indexOf(vm.formOtrasActividades.nombre_actividad);
                    //     vm.actCnx.splice(pos, 1);
                    // }
                    cargarData();
                }).catch(function (err) {
                    serviceNotification.error('No se pudo guardar la Actividad', 2000);
                });
            } else {
                modalNotifService.openModal('Las horas conexas no pueden superar un numero de ' + RGFactory.horasCnx);
            }
        }
    }

    function editOtrasActividades() {
        OAService.modificarOA({ donde: vm.formOtrasActividades.id, datos: vm.formOtrasActividades }).then(function (res) {
            serviceNotification.success('Actividad modificada correctamente', 3000);
            cargarData();
        }).catch(function (err) {
            serviceNotification.error('No se pudo modificar la Actividad', 2000);
        });
    }

    vm.deleteOtrasActividades = function (oa) {
        modalNotifService.openModal('Esta seguro de eliminar la actividad?').then(function (bool) {
            if (bool) {
                OAService.eliminarOA(oa).then(function (res) {
                    serviceNotification.success('Actividad eliminada correctamente', 3000);
                    if (oa.nombre_actividad == "ATENCIÓN ESTUDIANTES" ||
                        oa.nombre_actividad == "PREPARACIÓN DE CLASES" ||
                        oa.nombre_actividad == "CALIFICACIONES DE EXÁMENES") {
                        vm.actCnx.push(oa.nombre_actividad);
                    }
                    cargarData();
                }).catch(function (err) {
                    serviceNotification.error('No se pudo eliminar la Actividad', 2000);
                });
            }
        });
    }

    vm.saveObservaciones = function (Observacion) {
        RGService.modificarRG(vm.resumenGeneral).then(function (res) {
            serviceNotification.success('Observación guardada correctamente', 3000);
            cargarData();
        }).catch(function (err) {
            serviceNotification.error('No se pudo guardar la Observación', 2000);
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

    function horasConexas() {
        var horascnx = 0;
        if (vm.otrasActividades[0] != undefined) {
            for (let i = 0; i < vm.otrasActividades.length; i++) {
                if (vm.otrasActividades[i].nombre_actividad == "ATENCIÓN ESTUDIANTES" ||
                    vm.otrasActividades[i].nombre_actividad == "PREPARACIÓN DE CLASES" ||
                    vm.otrasActividades[i].nombre_actividad == "CALIFICACIONES DE EXÁMENES") {
                    horascnx = horascnx + vm.otrasActividades[i].horas_semanales;
                    if (i + 1 == vm.otrasActividades.length) {
                        return horascnx;
                    }
                } else {
                    if (i + 1 == vm.otrasActividades.length) {
                        return horascnx;
                    }
                }
            }
        } else {
            return horascnx;
        }
    }

    function actuliazarselect(is) {
        for (let i = 0; i < vm.otrasActividades.length; i++) {            
            if (vm.otrasActividades[i].nombre_actividad == "ATENCIÓN ESTUDIANTES" ||
            vm.otrasActividades[i].nombre_actividad == "PREPARACIÓN DE CLASES" ||
            vm.otrasActividades[i].nombre_actividad == "CALIFICACIONES DE EXÁMENES") {
                var pos = vm.actCnx.indexOf(vm.otrasActividades[i].nombre_actividad);                
                vm.actCnx.splice(pos, 1);
            }
        }
    }
};