angular.module("iconic").controller("aInvestigacionesSCtrl", aInvestigacionesSCtrl);

aInvestigacionesSCtrl.$inject = ["ISService", "ISFactory", "ptdService", "ptdFactory", "loginFactory", "serviceNotification", "$q"];

function aInvestigacionesSCtrl(ISService, ISFactory, ptdService, ptdFactory, loginFactory, serviceNotification, $q) {
    var vm = this;
    var acciones = "";
    cargarIS();
    function cargarIS() {
        loginFactory.cargarEstatus().then(function () {
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
            vm.permiso = loginFactory.estatus.permisos.find(function (permiso){
				return permiso.tblRecursoId == 2;
			});
        });
        vm.accion = accion;
        vm.llenarModal = llenarModal;
        vm.vaciarMadal = vaciarMadal;
        vm.asignarData = asignarData;
        vm.deleteInvestigacionesSemilleros = deleteInvestigacionesSemilleros;
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

    function accion() {
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

    function deleteInvestigacionesSemilleros(is) {
        ISService.eliminarIS(is).then(function (res) {
            serviceNotification.success('Semillero eliminado correctamente', 3000);
            cargarIS();
        }).catch(function (err) {
            serviceNotification.error('No elimino el semillero', 2000);
        });
    }

    function llenarModal(is) {
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

    function vaciarMadal() {
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

    function asignarData(data) {
        vm.formInvestigacionesSemilleros.horas_semestrales = calculahoras(data);
    }

    function calculahoras(horas_semanales) {
        return horas_semanales * 22.5;
    };
};