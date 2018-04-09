angular.module("iconic").factory("DDFactory", DDFactory);

DDFactory.$inject = ["DDService", "loginService", "ptdFactory", "ptdService", "loginFactory", "$q"];

function DDFactory(DDService, loginService, ptdFactory, ptdService, loginFactory, $q) {
    var factoryDD = {
        DocDir: [],
        materias: [],
        proMat: {},
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
        if (loginFactory.perfil.id == 2) {
            buscarArea().then(function (area) {
                DDService.buscarMaterias(area).then(function (materia) {
                    factoryDD.materias = materia;
                    deferred.resolve();
                });
            });

        } else {
            DDService.buscarMaterias(loginFactory.estatus.area).then(function (materia) {
                factoryDD.materias = materia;
                deferred.resolve();
            });
        }
        return deferred.promise;
    }

    function buscarProgramaMateria(data) {
        var deferred = $q.defer();
        factoryDD.proMat = {};
        ptdService.buscarProgramaMateria(data).then(function (proMat) {
            factoryDD.proMat = proMat;
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
