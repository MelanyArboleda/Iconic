angular.module("iconic").factory("DDFactory", DDFactory);

DDFactory.$inject = ["DDService", "ptdFactory", "loginFactory", "serviceNotification", "$q"];

function DDFactory(DDService, ptdFactory, loginFactory, serviceNotification, $q) {
    var factoryDD = {
        DocDir: [],
        materias: [],
        buscarMaterias: buscarMaterias,
        buscarDocenciaDirecta: buscarDocenciaDirecta
    }
    return factoryDD;

    function buscarDocenciaDirecta() {
        var deferred = $q.defer();
        factoryDD.DocDir = [];
        DDService.buscarDD({ ptd: ptdFactory.ptd.id }).then(function (result) {
            factoryDD.DocDir = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }

    function buscarMaterias() {
        var deferred = $q.defer();
        factoryDD.materias = [];
        DDService.buscarMaterias(loginFactory.estatus.area).then(function (materia) {
            factoryDD.materias = materia;
            deferred.resolve();
        });
        return deferred.promise;
    }
}
