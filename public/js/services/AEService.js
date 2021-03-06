angular.module("iconic").service("AEService", AEService);

AEService.$inject = ["$http", "$q", "APP_CONSTANT"];

function AEService($http, $q, appConstant) {
    this.buscarAE = buscarAE;
    this.guardarAE = guardarAE;
    this.modificarAE = modificarAE;
    this.eliminarAE = eliminarAE;

    // llama servicio de buscar actividades de extension
    function buscarAE(ae) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarAE", ae).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de guardar actividades de extension
    function guardarAE(ae) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/guardarAE", ae).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de modificar actividades de extension
    function modificarAE(ae) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/modificarAE", ae).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de eliminar actividades de extension
    function eliminarAE(ae) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/eliminarAE", ae).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}