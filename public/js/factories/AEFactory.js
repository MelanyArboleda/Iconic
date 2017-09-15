angular.module("iconic").factory("AEFactory", AEFactory);

AEFactory.$inject = ["AEService", "serviceNotification", "$q"];

function AEFactory(AEService, serviceNotification, $q) {
    var factoryAE = {
        ExtPro: [],
        buscarApartAE: buscarApartAE
    }
    return factoryAE;

    function buscarApartAE(apartado) {
        var deferred = $q.defer();
        factoryAE.ExtPro = [];
        AEService.buscarAE(apartado).then(function (result) {
            factoryAE.ExtPro = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }
}