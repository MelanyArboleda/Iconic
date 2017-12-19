angular.module("iconic").factory("IPFactory", IPFactory);

IPFactory.$inject = ["IPService", "ptdFactory", "$q"];

function IPFactory(IPService, ptdFactory, $q) {
    var factoryIP = {
        InvPro: [],
        vinculos: [],
        buscarVinculosP: buscarVinculosP,
        buscarInvestigacionesProyectos: buscarInvestigacionesProyectos

    }
    return factoryIP;
    
    function buscarInvestigacionesProyectos() {
        var deferred = $q.defer();
        factoryIP.InvPro = [];
        IPService.buscarIP({ptd: ptdFactory.ptd.id }).then(function (result) {
            factoryIP.InvPro = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }

    function buscarVinculosP(){
        var deferred = $q.defer();
        factoryIP.vinculos = [];
        IPService.buscarVinculosP().then(function (vinculo){
            factoryIP.vinculos = vinculo;
            deferred.resolve();
        })
        return deferred.promise;
    }
}