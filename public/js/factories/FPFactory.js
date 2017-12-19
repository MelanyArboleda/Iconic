angular.module("iconic").factory("FPFactory", FPFactory);

FPFactory.$inject = ["FPService", "ptdFactory", "$q"];

function FPFactory(FPService, ptdFactory, $q) {
    var factoryFP = {
        ForPro: [],
        actores: [],
        buscarActor: buscarActor,
        buscarFormulacionProyectos: buscarFormulacionProyectos

    }
    return factoryFP;

    function buscarFormulacionProyectos(apartado) {
        var deferred = $q.defer();
        factoryFP.ForPro = [];
        FPService.buscarFP({ ptd: ptdFactory.ptd.id }).then(function (result) {
            factoryFP.ForPro = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }

    function buscarActor() {
        var deferred = $q.defer();
        factoryFP.actores = [];
        FPService.buscarActor().then(function (actor) {
            factoryFP.actores = actor;
            deferred.resolve();
        })
        return deferred.promise;
    }
}