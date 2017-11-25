angular.module("iconic").factory("APFactory", APFactory);

APFactory.$inject = ["APService", "ptdFactory", "serviceNotification", "$q"];

function APFactory(APService, ptdFactory, serviceNotification, $q) {
    var factoryAP = {
        AsePro: [],
        buscarAsesoriasProyectos: buscarAsesoriasProyectos
    }
    return factoryAP;

    function buscarAsesoriasProyectos() {
        var deferred = $q.defer();
        factoryAP.AsePro = [];
        APService.buscarAP({ ptd: ptdFactory.ptd.id }).then(function (result) {
            factoryAP.AsePro = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }
}