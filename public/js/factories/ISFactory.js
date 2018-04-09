angular.module("iconic").factory("ISFactory", ISFactory);

ISFactory.$inject = ["ISService", "ptdFactory", "$q"];

function ISFactory(ISService, ptdFactory, $q) {
    var factoryIS = {
        InvSem: [],
        vinculos:[],
        buscarVinculosS: buscarVinculosS,
        buscarInvestigacionesSemilleros: buscarInvestigacionesSemilleros
    }
    return factoryIS;

    function buscarInvestigacionesSemilleros() {
        var deferred = $q.defer();
        factoryIS.InvSem = [];
        ISService.buscarIS({ptd: ptdFactory.ptd.id }).then(function (result) {
            factoryIS.InvSem = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }

    function buscarVinculosS(){
        var deferred = $q.defer();
        factoryIS.vinculos = [];
        ISService.buscarVinculosS().then(function (vinculo){
            factoryIS.vinculos = vinculo;
            deferred.resolve();
        })
        return deferred.promise;
    }
}