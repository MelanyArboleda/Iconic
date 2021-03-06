angular.module("iconic").service("ISService", ISService);

ISService.$inject = ["$http", "$q", "APP_CONSTANT"];

function ISService($http, $q, appConstant) {
    this.buscarIS = buscarIS;
    this.guardarIS = guardarIS;
    this.modificarIS = modificarIS;
    this.eliminarIS = eliminarIS;
    this.buscarVinculosS = buscarVinculosS;

    // llama servicio de buscar investigaciones de semilleros
    function buscarIS(is) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarIS", is).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de guardar investigaciones de semilleros
    function guardarIS(is) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/guardarIS", is).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de modificar investigaciones de semilleros
    function modificarIS(is) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/modificarIS", is).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de eliminar investigaciones de semilleros
    function eliminarIS(is) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/eliminarIS", is).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de buscar vinculos de investigaciones de semilleros
    function buscarVinculosS() {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarVinculosS").then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}