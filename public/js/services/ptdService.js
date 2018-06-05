angular.module("iconic").service("ptdService", ptdService);

ptdService.$inject = ["$http", "$q", "APP_CONSTANT"];

function ptdService($http, $q, appConstant) {
    this.createPtd = createPtd;
    this.buscarPtd = buscarPtd;
    this.guardarPtd = guardarPtd;
    this.guardarConcertacion = guardarConcertacion;

    // llama servicio de crear plan de trabajo
    function createPtd(user) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/createPtd", user).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de buscar plan de trabajo
    function buscarPtd(ptd) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarPtd", ptd).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de guardar plan de trabajo
    function guardarPtd(ptd) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/guardarPtd", ptd).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de guardar concertacion
    function guardarConcertacion(concertacion){
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/guardarConcertacion", concertacion).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}