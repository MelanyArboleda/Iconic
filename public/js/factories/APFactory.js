angular.module("iconic").factory("APFactory", APFactory);

APFactory.$inject = ["APService", "serviceNotification", "$q"];

function APFactory(APService, serviceNotification, $q) {
    var factoryAP = {
        AsePro: [],
        buscarApartAP: buscarApartAP
    }
    function buscarApartAP(apartado) {
        var deferred = $q.defer();
        factoryAP.AsePro = [];
        APService.buscarAP(apartado).then(function (result) {
            factoryAP.AsePro = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }
}