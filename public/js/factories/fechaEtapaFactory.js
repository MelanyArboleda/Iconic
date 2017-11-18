angular.module("iconic").factory("fechaEtapaFactory", fechaEtapaFactory);

fechaEtapaFactory.$inject = ["fechaEtapaService", "loginFactory", "serviceNotification", "$q"];

function fechaEtapaFactory(fechaEtapaService, loginFactory, serviceNotification, $q) {
    var factoryFechaEtapa = {
        fechaEtapa: [],
        buscarFechaEtapa: buscarFechaEtapa,
    }
    return factoryFechaEtapa;

    function buscarFechaEtapa() {
        var deferred = $q.defer();
        factoryFechaEtapa.fechaEtapa = [];
        var d = new Date();
        var año = d.getFullYear();
        loginFactory.cargarEstatus().then(function () {
            console.log("Estatus--------",loginFactory.estatus);
            fechaEtapaService.buscarFechaEtapa({ tblFacultadeId: loginFactory.estatus.facultad.id, ano: año }).then(function (result) {
                factoryFechaEtapa.fechaEtapa = result.apartado;
                deferred.resolve();
            });
        });
        return deferred.promise;
    }


}