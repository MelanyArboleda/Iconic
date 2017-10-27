angular.module("iconic").factory("OAFactory", OAFactory);

OAFactory.$inject = ["OAService", "serviceNotification", "$q"];

function OAFactory(OAService, serviceNotification, $q) {
    var factoryOA = {
        OtrAct: [],
        buscarApartOA:buscarApartOA
    }
    return factoryOA;

    function buscarApartOA(apartado) {
        var deferred = $q.defer();
        factoryOA.OtrAct = [];
        OAService.buscarOA(apartado).then(function (result) {
            factoryOA.OtrAct = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }
}