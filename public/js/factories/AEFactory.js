angular.module("iconic").factory("AEFactory", AEFactory);

AEFactory.$inject = ["AEService", "ptdFactory", "$q"];

function AEFactory(AEService, ptdFactory, $q) {
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