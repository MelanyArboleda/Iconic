angular.module("iconic").service("RGService", RGService);

RGService.$inject = ["$http", "$q", "APP_CONSTANT"];

function RGService($http, $q, appConstant) {
    this.buscarRG = buscarRG;
    this.crearRG = crearRG;
    this.modificarRG = modificarRG;

    // llama servicio de buscar resumen general
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

    // llama servicio de crear resumen general
    function crearRG(rg) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/crearRG", rg).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de modifcar resumen general
    function modificarRG(rg) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/modificarRG", rg).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}