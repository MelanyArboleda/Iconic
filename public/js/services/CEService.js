angular.module("iconic").service("CEService", CEService);

CEService.$inject = ["$http", "$q", "APP_CONSTANT"];

function CEService($http, $q, appConstant) {
    this.buscarCE = buscarCE;
    this.guardarCE = guardarCE;
    this.modificarCE = modificarCE;
    this.eliminarCE = eliminarCE;

    // llama servicio de buscar comosion de estudios
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

    // llama servicio de guardar comosion de estudios
    function guardarCE(ce) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/guardarCE", ce).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de modificar comosion de estudios
    function modificarCE(ce) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/modificarCE", ce).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de eliminar comosion de estudios
    function eliminarCE(ce) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/eliminarCE", ce).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}