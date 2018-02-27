angular.module("iconic").controller("aObservacionesCtrl", aObservacionesCtrl);

aObservacionesCtrl.$inject = ["ObservacionesFactory", "fechaEtapaFactory", "ObservacionesService", "ptdFactory", "$rootScope", "serviceNotification"];

function aObservacionesCtrl(ObservacionesFactory, fechaEtapaFactory, ObservacionesService, ptdFactory, $rootScope, serviceNotification) {
	var vm = this;

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
	}

	vm.saveObservaciones = function (){
		ObservacionesService.guardarObservaciones({donde : vm.observaciones.id, datos: vm.observaciones}).then(function (res) {
			serviceNotification.success('Observacion guardada correctamente', 3000);
			cardarObservaciones();
		}).catch(function (err) {
			serviceNotification.error('No se guardó la observacion', 2000);
		});
	}
};

