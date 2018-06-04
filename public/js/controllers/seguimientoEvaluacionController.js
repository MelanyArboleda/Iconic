angular.module("iconic").controller("SeguimientoEvaluacionCtrl", SeguimientoEvaluacionCtrl);

SeguimientoEvaluacionCtrl.$inject = ["$rootScope", "SEFactory", "SEService", "ptdFactory", "loginFactory", "serviceNotification", "$q", "modalNotifService"];

function SeguimientoEvaluacionCtrl($rootScope, SEFactory, SEService, ptdFactory, loginFactory, serviceNotification, $q, modalNotifService) {
	var vm = this;
	if ($rootScope.infoReady == true) {		
		cargarS();
		cargarE();
	} else {
		$rootScope.$on("InfoReady", function () {
			cargarS();
			cargarE();
		});
    }

    function cargarS(){		
        SEFactory.buscarSE({semana: 6, tblPtdId: ptdFactory.ptd.id}).then(function () {
			vm.seguimiento = SEFactory.seguimiento;
		});
		
		vm.permisoSeg = loginFactory.estatus.permisos.find(function (permiso) {
			return permiso.tblRecursoId == 9;
		});
		
		vm.perfil = loginFactory.user.perfil;
		vm.formFirmasSeg = {
			firma_coord_prog: '',
			firma_docente: ''
		}
	}

	function cargarE(){
		SEFactory.buscarSE({semana: 23,tblPtdId: ptdFactory.ptd.id}).then(function () {
			vm.evaluacion = SEFactory.evaluacion;
		});
		
		vm.permisoEva = loginFactory.estatus.permisos.find(function (permiso) {
			return permiso.tblRecursoId == 10;
		});
		
		vm.perfil = loginFactory.user.perfil;
		vm.formFirmasEva = {
			firma_coord_prog: '',
			firma_docente: ''
		}
	}

	
	
	vm.saveS = function(){		
		SEService.guardarSE({ donde: vm.seguimiento.id, datos: vm.seguimiento.descripcion }).then(function (res) {
			serviceNotification.success('Seguimiento guardado correctamente', 3000);
			cargarS();
		}).catch(function (err) {
			serviceNotification.error('No se pudo guardar el Seguimiento', 2000);
		});
		
	}

	vm.saveE = function(){
		SEService.guardarSE({ donde: vm.evaluacion.id, datos: vm.evaluacion.descripcion }).then(function (res) {
			serviceNotification.success('Evaluacion guardada correctamente', 3000);
			cargarE();
		}).catch(function (err) {
			serviceNotification.error('No se pudo guardar la Evaluacion', 2000);
		});
	}
	
	vm.saveFirmaS = function(){
		SEService.guardarFirmaSE({ donde: vm.seguimiento.id, datos: vm.formFirmasSeg, user: loginFactory.user.doc_identidad }).then(function (res) {
			serviceNotification.success('Firma guardada correctamente', 3000);
			cargarS();
		}).catch(function (err) {
			vm.formFirmasSeg = {
				firma_coord_prog: '',
				firma_docente: ''
			}
			if (err.status == 401) {
				modalNotifService.openModal("La contraseña de la firma es incorrecta");
			}
			if (err.status == 403) {
				serviceNotification.error("No se pudo guardar la firma", 2000);
			}
		});
	}

	vm.saveFirmaE = function(){
		SEService.guardarFirmaSE({ donde: vm.evaluacion.id, datos: vm.formFirmasEva, user: loginFactory.user.doc_identidad }).then(function (res) {
			serviceNotification.success('Firma guardada correctamente', 3000);
			cargarE();
		}).catch(function (err) {
			vm.formFirmasEva = {
				firma_coord_prog: '',
				firma_docente: ''
			}
			if (err.status == 401) {
				modalNotifService.openModal("La contraseña de la firma es incorrecta");
			}
			if (err.status == 403) {
				serviceNotification.error("No se pudo guardar la firma", 2000);
			}
		});
	}
}
