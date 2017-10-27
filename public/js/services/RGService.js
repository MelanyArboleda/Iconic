angular.module("iconic").service("RGService", RGService);

RGService.$inject = ["$http", "$q", "APP_CONSTANT"];

function RGService($http, $q, appConstant) {
    this.buscarRG = buscarRG;
    this.guardarRG = guardarRG;
    this.modificarRG = modificarRG;
    this.eliminarRG = eliminarRG;

    function buscarRG(rg) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarRG", rg).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function guardarRG(rg) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/guardarRG", rg).then(function (res) {
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function modificarRG(rg) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/modificarRG", rg).then(function (res) {
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function eliminarRG(rg) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/eliminarRG", rg).then(function (res) {
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}