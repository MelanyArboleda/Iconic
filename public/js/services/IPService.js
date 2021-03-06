angular.module("iconic").service("IPService", IPService);

IPService.$inject = ["$http", "$q", "APP_CONSTANT"];

function IPService($http, $q, appConstant) {
    this.buscarIP = buscarIP;
    this.guardarIP = guardarIP;
    this.modificarIP = modificarIP;
    this.eliminarIP = eliminarIP;
    this.buscarVinculosP = buscarVinculosP;

    // llama servicio de buscar investigaciones de proyectos
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

    // llama servicio de guardar investigaciones de proyectos
    function guardarIP(ip) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/guardarIP", ip).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de modificar investigaciones de proyectos
    function modificarIP(ip) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/modificarIP", ip).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de eliminar investigaciones de proyectos
    function eliminarIP(ip) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/eliminarIP", ip).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de buscar vinculos por investigaciones de proyectos
    function buscarVinculosP() {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarVinculosP").then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}