angular.module("iconic").controller("aInvestigacionesPCtrl", aInvestigacionesPCtrl);

aInvestigacionesPCtrl.$inject = ["IPService", "IPFactory", "ptdService", "ptdFactory", "loginFactory", "serviceNotification", "$q"];

function aInvestigacionesPCtrl(IPService, IPFactory, ptdService, ptdFactory, loginFactory, serviceNotification, $q) {
    var vm = this;
    var acciones = "";
    cargarIP();
    function cargarIP() {
        loginFactory.cargarEstatus().then(function () {
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
            vm.permiso = loginFactory.estatus.permisos.find(function (permiso){
				return permiso.tblRecursoId == 2;
			});
        });
        vm.accion = accion;
        vm.llenarModal = llenarModal;
        vm.vaciarMadal = vaciarMadal;
        vm.asignarData = asignarData;
        vm.deleteInvestigacionesProyectos = deleteInvestigacionesProyectos;
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

    function accion() {
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

    function deleteInvestigacionesProyectos(ip) {
        IPService.eliminarIP(ip).then(function (res) {
            serviceNotification.success('Proyecto eliminado correctamente', 3000);
            cargarIP();
        }).catch(function (err) {
            serviceNotification.error('No elimino el proyecto', 2000);
        });
    }

    function llenarModal(ip) {
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

    function vaciarMadal() {
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

    function asignarData(data) {
        vm.formInvestigacionesProyectos.horas_semestrales = calculahoras(data);
    }

    function calculahoras(horas_semanales) {
        return horas_semanales * 22.5;
    };
};