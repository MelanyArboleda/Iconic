angular.module("iconic").service("asesoriasService", asesoriasService);

asesoriasService.$inject = ["$http", "$q"];

function asesoriasService($http, $q) {
    this.buscarAP = buscarAP;
    this.guardarAP = guardarAP;

    function buscarAP(ap) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/buscarAP", ap).then(function (res) {
            console.log(res);
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function guardarAP(ap) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/guardarAP", ap).then(function (res) {
            console.log(res);
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}