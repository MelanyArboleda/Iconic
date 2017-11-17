angular.module("iconic").service("fechaEtapaService", fechaEtapaService);

fechaEtapaService.$inject = ["$http", "$q", "APP_CONSTANT"];

function fechaEtapaService($http, $q, appConstant) {
    this.buscarFechaEtapa = buscarFechaEtapa;
    this.guardarFechaEtapa = guardarFechaEtapa;

    function buscarFechaEtapa(data) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarFechaEtapa", data).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function guardarFechaEtapa(data) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/guardarFechaEtapa", data).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}    
   