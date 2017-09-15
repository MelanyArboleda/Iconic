angular.module("iconic").factory("FPFactory", FPFactory);

FPFactory.$inject = ["FPService", "serviceNotification", "$q"];

function FPFactory(FPService, serviceNotification, $q) {
    var factoryFP = {
        ForPro: [],
        buscarApartFP: buscarApartFP
    }
    function buscarApartFP(apartado) {
        var deferred = $q.defer();
        factoryFP.ForPro = [];
        FPService.buscarFP(apartado).then(function (result) {
            factoryFP.ForPro = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }
}