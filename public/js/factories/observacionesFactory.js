angular.module("iconic").factory("asesoriasFactory", asesoriasFactory);

asesoriasFactory.$inject = ["asesoriasService", "$q"];

function asesoriasFactory(asesoriasService, $q) {
    var factoryap = {
        aasesoria: [],
        buscarApartAP: buscarApartAP
    }
    function buscarApartAP(apartado) {
        var deferred = $q.defer();
        factoryep.aextension = [];
        asesoriasService.buscarAP(apartado).then(function (result) {
            factoryap.aasesoria = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }
}