angular.module("iconic").factory("ISFactory", ISFactory);

ISFactory.$inject = ["ISService", "serviceNotification", "$q"];

function ISFactory(ISService, serviceNotification, $q) {
    var factoryIS = {
        InvSem: [],
        buscarApartIS: buscarApartIS
    }
    return factoryIS;

    function buscarApartIS(apartado) {
        var deferred = $q.defer();
        factoryIS.InvSem = [];
        ISService.buscarIS(apartado).then(function (result) {
            factoryIS.InvSem = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }
}