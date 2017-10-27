angular.module("iconic").service("ISService", ISService);

ISService.$inject = ["$http", "$q", "APP_CONSTANT"];

function ISService($http, $q, appConstant) {
    this.buscarIS = buscarIS;
    this.guardarIS = guardarIS;
    this.modificarIS = modificarIS;
    this.eliminarIS = eliminarIS;
    this.buscarVS = buscarVS;

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

    function guardarIS(is) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/guardarIS", is).then(function (res) {
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function modificarIS(is) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/modificarIS", is).then(function (res) {
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function eliminarIS(is) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/eliminarIS", is).then(function (res) {
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function buscarVS() {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarVS").then(function (res) {
            deferred.resolve(res.data.vinculo);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}