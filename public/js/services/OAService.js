angular.module("iconic").service("otrasactividadesService", otrasactividadesService);

otrasactividadesService.$inject = ["$http", "$q"];

function otrasactividadesService($http, $q) {
    this.buscarActividades = buscarActividades;
    this.guardarActividades = guardarActividades;

    function buscarActividades(actividades) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/buscarActividades", actividades).then(function (res) {
            console.log(res);
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function guardarActividades(actividades) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/guardarActividades", actividades).then(function (res) {
            console.log(res);
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}