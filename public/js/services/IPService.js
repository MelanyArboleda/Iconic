angular.module("iconic").service("IPService", IPService);

IPService.$inject = ["$http", "$q", "APP_CONSTANT"];

function IPService($http, $q, appConstant) {
    this.buscarIP = buscarIP;
    this.guardarIP = guardarIP;
    this.modificarIP = modificarIP;
    this.eliminarIP = eliminarIP;
    this.buscarVP = buscarVP;

    function buscarIP(ip) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarIP", ip).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function guardarIP(ip) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/guardarIP", ip).then(function (res) {
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function modificarIP(ip) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/modificarIP", ip).then(function (res) {
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function eliminarIP(ip) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/eliminarIP", ip).then(function (res) {
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function buscarVP() {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarVP").then(function (res) {
            deferred.resolve(res.data.vinculo);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}