angular.module("iconic").controller("aObservacionesCtrl",aObservacionesCtrl);

aObservacionesCtrl.$inject = ["ptdService", "ptdFactory", "serviceNotification"];

    function aObservacionesCtrl(ptdService, ptdFactory, serviceNotification) {
	var vm = this;
	vm.aObservaciones = aObservaciones;
	vm.observaciones = ptdFactory.aobservacion;
	
	function aObservaciones(){ 
		vm.observaciones.tblPtdId= ptdFactory.ptd.id,
			data = {
				datos: vm.observaciones,
				tabla: 'tbl_observaciones' 
			}
			console.log("llama a servicio Save de observaciones");
			ptdService.save(data).then(function (resultado) {
				ptdFactory.aobservacion=resultado.apartado;
				console.log(resultado);
				serviceNotification.success('Apartado guardado correctamente', 3000);
			}).catch(function (err) {
				console.log(err);
				serviceNotification.error('No se guardó el apartado', 2000);
			});
	}
};

