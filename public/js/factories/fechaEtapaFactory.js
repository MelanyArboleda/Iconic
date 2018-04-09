angular.module("iconic").factory("fechaEtapaFactory", fechaEtapaFactory);

fechaEtapaFactory.$inject = ["fechaEtapaService", "loginFactory", "$q"];

function fechaEtapaFactory(fechaEtapaService, loginFactory, $q) {
    var factoryFechaEtapa = {
        fechaEtapa: [],
        buscarFechaEtapa: buscarFechaEtapa,
    }
    return factoryFechaEtapa;

    function buscarFechaEtapa() {
        var deferred = $q.defer();
        factoryFechaEtapa.fechaEtapa = [];
        var d = new Date();
        var año = d.getFullYear();
        var mes = d.getMonth();
        var semestre = 0;
        if (mes >= 7) {
            semestre = 2;
        } else {
            semestre = 1;
        }
        fechaEtapaService.buscarFechaEtapa({ tblFacultadeId: loginFactory.estatus.facultad.id, ano: año, semestre: semestre }).then(function (result) {
            factoryFechaEtapa.fechaEtapa = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }


}