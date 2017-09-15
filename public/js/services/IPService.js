angular.module("iconic").service("IPService", IPService);

IPService.$inject = ["$http", "$q"];

function IPService($http, $q) {
    this.buscarIP = buscarIP;
    this.guardarIP = guardarIP;

    function buscarIP(ip) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/buscarIP", ip).then(function (res) {
            console.log(res);
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function guardarIP(ip) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/guardarIP", ip).then(function (res) {
            console.log(res);
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}