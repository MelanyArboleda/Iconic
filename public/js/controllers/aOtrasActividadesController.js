angular.module("iconic").controller("aOtrasActividadesCtrl", aOtrasActividadesCtrl);

aOtrasActividadesCtrl.$inject = ["OAFactory", "OAService", "RGFactory", "RGService", "ptdFactory", "serviceNotification", "$q"];

function aOtrasActividadesCtrl(OAFactory, OAService, RGFactory, RGService, ptdFactory, serviceNotification, $q) {
    var vm = this;
    var acciones = "";
    cargarData();
    function cargarData() {
        RGFactory.modificarResumenGeneral().then(function () {
            RGFactory.buscarResumenGeneral().then(function () {
                OAFactory.buscarOtrasActividades(RGFactory.ResGen.id).then(function () {
                    vm.otrasActividades = OAFactory.OtrAct;
                    for (var i = 0; i < vm.otrasActividades.length; i++) {
                        vm.otrasActividades[i].horas_semestrales = calculahoras(vm.otrasActividades[i].horas_semanales);
                    }
                });
                vm.resumenGeneral = RGFactory.ResGen;
            });
        });
        vm.accion = accion;
        vm.llenarModal = llenarModal;
        vm.vaciarMadal = vaciarMadal;
        vm.asignarData = asignarData;
        vm.saveObservaciones = saveObservaciones;
        vm.deleteOtrasActividades = deleteOtrasActividades;
        vm.formOtrasActividades = {
            nombre_actividad: '',
            horas_semanales: '',
            horas_semestrales: '',
            descripcion_productos: '',
            tblResumeneId: ''
        }
    }

    function accion() {
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

    function deleteOtrasActividades(oa) {
        OAService.eliminarOA(oa).then(function (res) {
            serviceNotification.success('Actividad eliminado correctamente', 3000);
            cargarData();
        }).catch(function (err) {
            serviceNotification.error('No elimino la Actividad', 2000);
        });
    }

    function saveObservaciones(Observacion) {
        RGService.modificarRG(vm.resumenGeneral).then(function (res) {
            serviceNotification.success('Observación guardada correctamente', 3000);
            cargarData();
        }).catch(function (err) {
            serviceNotification.error('No se guardó la Observación', 2000);
        });
    }

    function llenarModal(oa) {
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

    function vaciarMadal() {
        acciones = "1";
        vm.formOtrasActividades = {
            nombre_actividad: '',
            horas_semanales: '',
            horas_semestrales: '',
            descripcion_productos: '',
            tblResumeneId: RGFactory.ResGen.id
        }
    }

    function asignarData(data) {
        vm.formOtrasActividades.horas_semestrales = calculahoras(data);

    }

    function calculahoras(horas_semanales) {
        //validar el programa del usuario para saber si son 16 o 18
        return horas_semanales * 16;
    };
};