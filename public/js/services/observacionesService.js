angular.module("iconic").service("observacionesService", observacionesService);

observacionesService.$inject = ["$http", "$q"];

function observacionesService($http, $q) {
    this.buscarObservaciones = buscarObservaciones;
    this.guardarObservaciones = guardarObservaciones;

    function buscarObservaciones(observaciones) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/buscarObservaciones", observaciones).then(function (res) {
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
        $http.post("http://localhost:3000/auth/guardarObservaciones", observaciones).then(function (res) {
            console.log(res);
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}