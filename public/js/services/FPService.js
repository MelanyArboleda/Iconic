angular.module("iconic").service("proyectosService", proyectosService);

proyectosService.$inject = ["$http", "$q"];

function proyectosService($http, $q) {
    this.buscarFP = buscarFP;
    this.guardarFP = guardarFP;

    function buscarFP(fp) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/buscarFP", fp).then(function (res) {
            console.log(res);
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function guardarFP(fp) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/guardarFP", fp).then(function (res) {
            console.log(res);
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}