angular.module("iconic").service("observacionesService", observacionesService);

observacionesService.$inject = ["$http", "$q", "APP_CONSTANT"];

function observacionesService($http, $q, appConstant) {
    this.buscarObservaciones = buscarObservaciones;
    this.guardarObservaciones = guardarObservaciones;

    function buscarObservaciones(observaciones) {
        var deferred = $q.defer();
        $http.post("http://192.168.1.18:3000/auth/buscarObservaciones", observaciones).then(function (res) {
            console.log(res);
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function guardarObservaciones(observaciones) {
        var deferred = $q.defer();
        $http.post("http://192.168.1.18:3000/auth/guardarObservaciones", observaciones).then(function (res) {
            console.log(res);
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}