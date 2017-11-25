angular.module("iconic").factory("AEFactory", AEFactory);

AEFactory.$inject = ["AEService", "ptdFactory", "serviceNotification", "$q"];

function AEFactory(AEService, ptdFactory, serviceNotification, $q) {
    var factoryAE = {
        ExtPro: [],
        buscartActividadesExtension: buscartActividadesExtension
    }
    return factoryAE;

    function buscartActividadesExtension() {
        var deferred = $q.defer();
        factoryAE.ExtPro = [];
        AEService.buscarAE({ ptd: ptdFactory.ptd.id }).then(function (result) {
            factoryAE.ExtPro = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }
}