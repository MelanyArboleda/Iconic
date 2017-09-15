angular.module("iconic").service("CEService", CEService);

CEService.$inject = ["$http", "$q"];

function CEService($http, $q) {
    this.buscarCE = buscarCE;
    this.guardarCE = guardarCE;

    function buscarCE(ce) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/buscarCE", ce).then(function (res) {
            console.log(res);
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function guardarCE(ce) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/guardarCE", ce).then(function (res) {
            console.log(res);
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}