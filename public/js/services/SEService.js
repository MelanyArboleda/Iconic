angular.module("iconic").service("SEService", SEService);

SEService.$inject = ["$http", "$q", "APP_CONSTANT"];

function SEService($http, $q, appConstant) {
    this.buscarSE = buscarSE;
    this.crearSE = crearSE;
    this.guardarSE = guardarSE;
    this.guardarFirmaSE = guardarFirmaSE;

    function buscarSE(data) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/buscarSE", data).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function crearSE(data) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/crearSE", data).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function guardarSE(data) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/guardarSE", data).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function guardarFirmaSE(data){
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/guardarFirmaSE", data).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}