angular.module("iconic").service("AEService", AEService);

AEService.$inject = ["$http", "$q"];

function AEService($http, $q) {
    this.buscarAE = buscarAE;
    this.guardarAE = guardarAE;

    function buscarAE(ae) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/buscarAE", ae).then(function (res) {
            console.log(res);
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function guardarAE(ae) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/guardarAE", ae).then(function (res) {
            console.log(res);
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}