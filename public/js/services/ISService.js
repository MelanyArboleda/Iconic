angular.module("iconic").service("ISService", ISService);

ISService.$inject = ["$http", "$q"];

function ISService($http, $q) {
    this.buscarIS = buscarIS;
    this.guardarIS = guardarIS;

    function buscarIS(is) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/buscarIS", is).then(function (res) {
            console.log(res);
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function guardarIS(is) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/guardarIS", is).then(function (res) {
            console.log(res);
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}