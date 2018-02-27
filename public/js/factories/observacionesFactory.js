angular.module("iconic").factory("ObservacionesFactory", ObservacionesFactory);

ObservacionesFactory.$inject = ["ObservacionesService", "ptdFactory", "planesService", "$q"];

function ObservacionesFactory(ObservacionesService, ptdFactory, planesService, $q) {
    var factoryObservaciones = {
        planesUser: [],
        observaciones: {},
        buscarPtdsUser: buscarPtdsUser,
        buscarObservaciones: buscarObservaciones,
        crearObservaciones: crearObservaciones
    }
    return factoryObservaciones;

    function buscarPtdsUser(data) {
        var deferred = $q.defer();
        factoryObservaciones.planesUser = [];
        planesService.buscarPtdsUser(data).then(function (result) {
            factoryObservaciones.planesUser = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }

    function buscarObservaciones() {
        var deferred = $q.defer();
        factoryObservaciones.observaciones = {};
        ObservacionesService.buscarObservaciones({ tblPtdId: ptdFactory.ptd.id }).then(function (result) {
            factoryObservaciones.observaciones = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }

    function crearObservaciones(id) {
        var deferred = $q.defer();
        ObservacionesService.crearObservaciones({
            observacion: '', firma_consejo_facultad: false, firma_coord_prog: false, firma_docente: false, tblPtdId: id
        }).then(function (result) {
            deferred.resolve();
        });
        return deferred.promise;
    }
}