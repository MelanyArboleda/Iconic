angular.module("iconic").service("ObservacionesService", ObservacionesService);

ObservacionesService.$inject = ["$http", "$q", "APP_CONSTANT"];

function ObservacionesService($http, $q, appConstant){
    this.buscarObservaciones = buscarObservaciones;
    this.crearObservaciones = crearObservaciones;
    this.guardarObservaciones = guardarObservaciones;
    this.guardarFirmaObservaciones = guardarFirmaObservaciones;

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