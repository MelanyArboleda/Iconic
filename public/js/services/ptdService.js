angular.module("iconic").service("ptdService", ptdService);

ptdService.$inject = ["$http", "$q", "APP_CONSTANT"];

function ptdService($http, $q, appConstant) {
    this.createPtd = createPtd;
    this.buscarPtd = buscarPtd;
    this.guardarPtd = guardarPtd;
    this.buscarArea = buscarArea;
    this.buscarDedicacion = buscarDedicacion;
    this.guardarConcertacion = guardarConcertacion;

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

    function guardarPtd(ptd) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/guardarPtd", ptd).then(function (res) {
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function buscarArea(user) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarArea", user).then(function (res) {
            deferred.resolve(res.data.area);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function buscarDedicacion(user) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarDedicacion", user).then(function (res) {
            deferred.resolve(res.data.dedicacion);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

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