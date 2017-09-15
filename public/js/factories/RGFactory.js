angular.module("iconic").factory("RGFactory", RGFactory);

RGFactory.$inject = ["RGService", "serviceNotification", "$q"];

function RGFactory(RGService, serviceNotification, $q) {
    var factoryRG = {
        ResGen: {},
        buscarApartRG: buscarApartRG
    }
    function buscarApartRG(apartado) {
        var deferred = $q.defer();
        factoryRG.ResGen = {};
        RGService.buscarApart(apartado).then(function (result) {
            factoryRG.ResGen = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }
}