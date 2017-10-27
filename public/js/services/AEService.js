angular.module("iconic").service("AEService", AEService);

AEService.$inject = ["$http", "$q", "APP_CONSTANT"];

function AEService($http, $q, appConstant) {
    this.buscarAE = buscarAE;
    this.guardarAE = guardarAE;
    this.modificarAE = modificarAE;
    this.eliminarAE = eliminarAE;

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

    function guardarAE(ae) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/guardarAE", ae).then(function (res) {
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function modificarAE(ae) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/modificarAE", ae).then(function (res) {
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function eliminarAE(ae) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/eliminarAE", ae).then(function (res) {
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}