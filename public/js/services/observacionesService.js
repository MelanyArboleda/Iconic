angular.module("iconic").service("ObservacionesService", ObservacionesService);

ObservacionesService.$inject = ["$http", "$q", "APP_CONSTANT"];

function ObservacionesService($http, $q, appConstant){
    this.buscarObservaciones = buscarObservaciones;
    this.crearObservaciones = crearObservaciones;
    this.guardarObservaciones = guardarObservaciones;
    this.guardarFirmaObservaciones = guardarFirmaObservaciones;

    // llama servicio de buscar observaciones
    function buscarObservaciones(data){
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/buscarObservaciones", data).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
    
    // llama servicio de crear observaciones
    function crearObservaciones(data){
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/crearObservaciones", data).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de guardar observaiones
    function guardarObservaciones(data){
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/guardarObservaciones", data).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de guardar firma de la observacion
    function guardarFirmaObservaciones(data){
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/guardarFirmaObservaciones", data).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}