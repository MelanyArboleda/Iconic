angular.module("iconic").factory("CEFactory", CEFactory);

CEFactory.$inject = ["CEService", "serviceNotification", "$q"];

function CEFactory(CEService, serviceNotification, $q) {
    var factoryCE = {
        ComEst: [],
        buscarApartCE: buscarApartCE
    }
    return factoryCE;
    
    function buscarApartCE(apartado) {
        var deferred = $q.defer();
        factoryCE.ComEst = [];
        CEService.buscarCE(apartado).then(function (result) {
            factoryCE.ComEst = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }
}