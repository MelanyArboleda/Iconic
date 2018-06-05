angular.module("iconic").controller("aObservacionesCtrl", aObservacionesCtrl);

aObservacionesCtrl.$inject = ["ObservacionesFactory", "fechaEtapaFactory", "RGFactory", "ObservacionesService", "ptdFactory", "loginFactory", "$rootScope", "serviceNotification", "modalNotifService"];

function aObservacionesCtrl(ObservacionesFactory, fechaEtapaFactory, RGFactory, ObservacionesService, ptdFactory, loginFactory, $rootScope, serviceNotification, modalNotifService) {
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
		ObservacionesFactory.buscarObservaciones().then(function () {
			vm.observaciones = ObservacionesFactory.observaciones;
		});
		vm.permiso = loginFactory.estatus.permisos.find(function (permiso) {
			return permiso.tblRecursoId == 16;
		});
		
		vm.permisoEnviar = loginFactory.estatus.permisos.find(function (permiso) {
			return permiso.tblRecursoId == 17;
		});
		
		vm.perfil = loginFactory.user.perfil;
		vm.formFirmas = {
			firma_consejo_facultad: '',
			firma_coord_prog: '',
			firma_docente: ''
		}
		RGFactory.modificarResumenGeneral().then(function () {
			RGFactory.buscarResumenGeneral().then(function () {
				if (loginFactory.user.dedicacion == 1) { mes = 900 }
				else if (loginFactory.user.dedicacion == 2) { mes = 450 }
				else if (loginFactory.user.dedicacion == 3) { mes = 900 }
				else { mes = 450 }
				if (RGFactory.ResGen.horas_semestrales_tot != mes) {
					vm.firme = false;
				} else {
					vm.firme = true;
				}
			});
		});
	}

	vm.saveObservaciones = function () {
		ObservacionesService.guardarObservaciones({ donde: vm.observaciones.id, datos: vm.observaciones }).then(function (res) {
			serviceNotification.success('Observación guardada correctamente', 3000);
			cardarObservaciones();
		}).catch(function (err) {
			serviceNotification.error('No se pudo guardar la observación', 2000);
		});
	}

	vm.saveFirma = function () {
		ObservacionesService.guardarFirmaObservaciones({ donde: vm.observaciones.id, datos: vm.formFirmas, user: loginFactory.user.doc_identidad }).then(function (res) {
			serviceNotification.success('Firma guardada correctamente', 3000);
			vm.firmaConsejo = false;
			vm.firmaCoordinador = false;
			vm.firmaDocente = false;
			cardarObservaciones();
		}).catch(function (err) {
			vm.formFirmas = {
				firma_consejo_facultad: '',
				firma_coord_prog: '',
				firma_docente: ''
			}
			if (err.status == 401) {
				serviceNotification.error("La contraseña de la firma es incorrecta", 3000);
			}
			if (err.status == 403) {
				serviceNotification.error("No se pudo guardar la firma", 2000);
			}
		});
	}

	vm.enviarPtd = function () {
		data = {
			doncente: loginFactory.user.nombre + ' ' + loginFactory.user.apellido_1,
			ptd: ptdFactory.ptd.id,
			facultad: loginFactory.estatus.facultad.id,
			doc_identidad: loginFactory.user.doc_identidad
		}
		ObservacionesService.enviarPtd(data).then(function () {
			cardarObservaciones();
			modalNotifService.openModal("El plan de trabajo fue enviado correctamente");
		}).catch(function (err) {
			modalNotifService.openModal("El plan de trabajo no se envio correctamente");
		});
	}
};

