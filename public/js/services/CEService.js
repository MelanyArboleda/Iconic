angular.module("iconic").service("CEService", CEService);

CEService.$inject = ["$http", "$q", "APP_CONSTANT"];

function CEService($http, $q, appConstant) {
    this.buscarCE = buscarCE;
    this.guardarCE = guardarCE;
    this.modificarCE = modificarCE;
    this.eliminarCE = eliminarCE;

    function buscarCE(ce) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarCE", ce).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function guardarCE(ce) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/guardarCE", ce).then(function (res) {
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function modificarCE(ce) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/modificarCE", ce).then(function (res) {
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function eliminarCE(ce) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/eliminarCE", ce).then(function (res) {
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}