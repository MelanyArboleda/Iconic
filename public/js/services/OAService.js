angular.module("iconic").service("OAService", OAService);

OAService.$inject = ["$http", "$q", "APP_CONSTANT"];

function OAService($http, $q, appConstant) {
    this.buscarOA = buscarOA;
    this.guardarOA = guardarOA;
    this.modificarOA = modificarOA;
    this.eliminarOA = eliminarOA;

    // llama servicio de buscar otras actividades
    function buscarOA(oa) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/buscarOA", oa).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de guardar otras actividades
    function guardarOA(oa) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/guardarOA", oa).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de modificar otras actividades
    function modificarOA(oa) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/modificarOA", oa).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de eliminar otras actidades
    function eliminarOA(oa) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/eliminarOA", oa).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}