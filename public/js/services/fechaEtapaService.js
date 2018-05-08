angular.module("iconic").service("fechaEtapaService", fechaEtapaService);

fechaEtapaService.$inject = ["$http", "$q", "APP_CONSTANT"];

function fechaEtapaService($http, $q, appConstant) {
    this.buscarFechaEtapa = buscarFechaEtapa;
    this.guardarFechaEtapa = guardarFechaEtapa;
    this.modificarFechaEtapa = modificarFechaEtapa;
    this.eliminarFechaEtapa = eliminarFechaEtapa;

    // llama servicio de buscar fecha de las etapas
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

    // llama servicio de guardar fecha de las etapas
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

    // llama servicio de modificar fecha de las etapas
    function modificarFechaEtapa(data) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/modificarFechaEtapa", data).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de eliminar fecha de las etapas
    function eliminarFechaEtapa(data) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/eliminarFechaEtapa", data).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}    
   