angular.module("iconic").service("DDService", DDService);

DDService.$inject = ["$http", "$q"];

function DDService($http, $q) {
    this.buscarDD = buscarDD;
    this.guardarDD = guardarDD;

    function buscarDD(dd) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/buscarDD", dd).then(function (res) {
            console.log(res);
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function guardarDD(dd) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/guardarDD", dd).then(function (res) {
            console.log(res);
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}