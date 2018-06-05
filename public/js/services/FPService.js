angular.module("iconic").service("FPService", FPService);

FPService.$inject = ["$http", "$q", "APP_CONSTANT"];

function FPService($http, $q, appConstant) {
    this.buscarFP = buscarFP;
    this.guardarFP = guardarFP;
    this.modificarFP = modificarFP;
    this.eliminarFP = eliminarFP;
    this.buscarActor = buscarActor;

    // llama servicio de buscar formulacion de proyectos
    function buscarFP(fp) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarFP", fp).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de guardar formulacion de proyectos
    function guardarFP(fp) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/guardarFP", fp).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de modificar formulacion de proyectos
    function modificarFP(fp) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/modificarFP", fp).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
    
    // llama servicio de eliminar formulacion de proyectos
    function eliminarFP(fp) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/eliminarFP", fp).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
     
    // llama servicio de buscar actores de formulacion de proyectos
    function buscarActor(){
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarActor").then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}