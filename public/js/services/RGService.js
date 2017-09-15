angular.module("iconic").service("RGService", RGService);

RGService.$inject = ["$http", "$q"];

function RGService($http, $q) {
    this.buscarRG = buscarRG;
    this.guardarRG = guardarRG;

    function buscarRG(rg) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/buscarRG", rg).then(function (res) {
            console.log(res);
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function guardarRG(rg) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/guardarRG", rg).then(function (res) {
            console.log(res);
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}