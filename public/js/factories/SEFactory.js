angular.module("iconic").factory("SEFactory", SEFactory);

SEFactory.$inject = ["SEService", "$q"];

function SEFactory(SEService, $q) {
    var factorySE = {
        seguimiento: {},
        evaluacion: {},
        buscarSE: buscarSE,
        crearSE: crearSE
    }
    return factorySE;

    function buscarSE(data) {
        var deferred = $q.defer();
        factorySE.seguimiento = {};
        factorySE.evaluacion = {};
        SEService.buscarSE(data).then(function (result) {   
            if (result.apartado.semana == 23) {
                factorySE.evaluacion = result.apartado;
                deferred.resolve();
            }else{
                factorySE.seguimiento = result.apartado;
                deferred.resolve();
            }
        });
        return deferred.promise;
    }

    function crearSE(id,semana) {
        var deferred = $q.defer();
        SEService.crearSE({
            semana: semana,
            descripcion: '',
            fecha: new Date(),
            firma_coord_prog: false,
            firma_docente: false,
            tblPtdId: id
        }).then(function (result) {
            deferred.resolve();
        });
        return deferred.promise;
    }
}