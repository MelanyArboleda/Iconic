angular.module("iconic").factory("DDFactory", DDFactory);

DDFactory.$inject = ["DDService", "ptdFactory", "ptdService","loginFactory", "serviceNotification", "$q"];

function DDFactory(DDService, ptdFactory,ptdService, loginFactory, serviceNotification, $q) {
    var factoryDD = {
        DocDir: [],
        materias: [],
        proMat:{},
        buscarMaterias: buscarMaterias,
        buscarProgramaMateria: buscarProgramaMateria,
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

    function buscarProgramaMateria(data){
        var deferred = $q.defer();
        factoryDD.proMat = {};
        ptdService.buscarProgramaMateria(data).then(function (proMat) {
            factoryDD.proMat = proMat;
            deferred.resolve();
        });
        return deferred.promise;
    }
}
