angular.module("iconic").factory("OAFactory", OAFactory);

OAFactory.$inject = ["OAService", "serviceNotification", "$q"];

function OAFactory(OAService, serviceNotification, $q) {
    var factoryOA = {
        OtrAct: [],
        buscarOtrasActividades:buscarOtrasActividades
    }
    return factoryOA;

    function buscarOtrasActividades(id) {
        var deferred = $q.defer();
        factoryOA.OtrAct = [];
        OAService.buscarOA({id:id}).then(function (result) {
            factoryOA.OtrAct = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }
}