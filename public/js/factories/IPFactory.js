angular.module("iconic").factory("IPFactory", IPFactory);

IPFactory.$inject = ["IPService", "serviceNotification", "$q"];

function IPFactory(IPService, serviceNotification, $q) {
    var factoryIP = {
        InvPro: [],
        buscarApartIP: buscarApartIP
    }
    return factoryIP;
    
    function buscarApartIP(apartado) {
        var deferred = $q.defer();
        factoryIP.InvPro = [];
        IPService.buscarIP(apartado).then(function (result) {
            factoryIP.InvPro = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }
}