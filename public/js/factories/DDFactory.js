angular.module("iconic").factory("DDFactory", DDFactory);

DDFactory.$inject = ["DDService", "loginService", "ptdFactory", "ptdService", "loginFactory", "$q"];

function DDFactory(DDService, loginService, ptdFactory, ptdService, loginFactory, $q) {
    var factoryDD = {
        DocDir: [],
        proMat: {},
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

    function buscarArea() {
        var deferred = $q.defer();
        loginService.buscarPrograma({ doc_identidad: ptdFactory.ptd.tblUsuarioDocIdentidad }).then(function (programa) {
            loginService.buscarArea({ id: programa.tblAreaId }).then(function (area) {
                deferred.resolve(area);
            });
        });  
        return deferred.promise;
    }
}
