angular.module("iconic").factory("DDFactory", DDFactory);

DDFactory.$inject = ["DDService", "serviceNotification", "$q"];

function DDFactory(DDService, serviceNotification, $q) {
    var factoryDD = {
        DocDir: [],
        buscarApartDD: buscarApartDD
    }
    return factoryDD;

    function buscarApartDD(apartado) {
        var deferred = $q.defer();
        factoryDD.DocDir = [];
        DDService.buscarDD(apartado).then(function (result) {
            factoryDD.DocDir = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }
}
