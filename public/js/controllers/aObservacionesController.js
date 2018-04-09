angular.module("iconic").controller("aObservacionesCtrl", aObservacionesCtrl);

aObservacionesCtrl.$inject = ["ObservacionesFactory", "fechaEtapaFactory", "ObservacionesService", "ptdFactory", "loginFactory", "$rootScope", "serviceNotification"];

function aObservacionesCtrl(ObservacionesFactory, fechaEtapaFactory, ObservacionesService, ptdFactory, loginFactory, $rootScope, serviceNotification) {
	var vm = this;
	vm.firmaConsejo = false;
	vm.firmaCoordinador = false;
	vm.firmaDocente = false;

	if ($rootScope.infoReady == true) {
		cardarObservaciones();
	} else {
		$rootScope.$on("InfoReady", function () {
			cardarObservaciones();
		});
	}

	function cardarObservaciones() {
		var data = fechaEtapaFactory.fechaEtapa[fechaEtapaFactory.fechaEtapa.length - 1];
		ObservacionesFactory.buscarPtdsUser({
			tblUsuarioDocIdentidad: ptdFactory.ptd.tblUsuarioDocIdentidad, semestre: data.semestre, ano: data.ano, version: ptdFactory.ptd.version
		}).then(function () {
			vm.ptds = ObservacionesFactory.planesUser;
		});
		ObservacionesFactory.buscarObservaciones().then(function(){
			vm.observaciones = ObservacionesFactory.observaciones;
		});
		vm.permiso = loginFactory.estatus.permisos.find(function (permiso) {
			return permiso.tblRecursoId == 16;
		});
		vm.perfil = loginFactory.user.perfil;
		vm.formFirmas ={
			firma_consejo_facultad: '',
			firma_coord_prog: '',
			firma_docente:''
		}
	}

	vm.saveObservaciones = function (){
		ObservacionesService.guardarObservaciones({donde : vm.observaciones.id, datos: vm.observaciones}).then(function (res) {
			serviceNotification.success('Observaci�n guardada correctamente', 3000);
			cardarObservaciones();
		}).catch(function (err) {
			serviceNotification.error('No se pudo guardar la observaci�n', 2000);
		});
	}

	vm.saveFirma = function(){
		ObservacionesService.guardarFirmaObservaciones({donde : vm.observaciones.id, datos: vm.formFirmas, user:loginFactory.user.doc_identidad}).then(function (res) {
			serviceNotification.success('Firma guardada correctamente', 3000);
			cardarObservaciones();
		}).catch(function (err) {
			vm.formFirmas = {
				firma_consejo_facultad: '',
				firma_coord_prog: '',
				firma_docente: ''
			}
			if (err.status == 401) {
				serviceNotification.error("La contrase�a de la firma es incorrecta", 2000);
			}
			if (err.status == 403) {
				serviceNotification.error("No se pudo guardar la firma", 2000);
			}
		});
	}
};

