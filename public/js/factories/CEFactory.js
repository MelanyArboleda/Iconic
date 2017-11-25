angular.module("iconic").factory("CEFactory", CEFactory);

CEFactory.$inject = ["CEService", "ptdFactory", "serviceNotification", "$q"];

function CEFactory(CEService, ptdFactory, serviceNotification, $q) {
    var factoryCE = {
        ComEst: [],
        buscarComisionEstudios: buscarComisionEstudios
    }
    return factoryCE;
    
    function buscarComisionEstudios() {
        var deferred = $q.defer();
        factoryCE.ComEst = [];
        CEService.buscarCE({ ptd: ptdFactory.ptd.id }).then(function (result) {
            factoryCE.ComEst = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }
}