angular.module("iconic").service("APService", APService);

APService.$inject = ["$http", "$q", "APP_CONSTANT"];

function APService($http, $q, appConstant) {
    this.buscarAP = buscarAP;
    this.guardarAP = guardarAP;
    this.modificarAP = modificarAP;
    this.eliminarAP = eliminarAP;

    // llama servicio de buscar asesoria de proyectos
    function buscarAP(ap) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarAP", ap).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de guardar asesoria de proyectos
    function guardarAP(ap) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/guardarAP", ap).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de modificar asesoria de proyectos
    function modificarAP(ap) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/modificarAP", ap).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de eliminar asesoria de proyectos
    function eliminarAP(ap) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/eliminarAP", ap).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}