angular.module("iconic").service("planesService", planesService);

planesService.$inject = ["$http", "$q", "APP_CONSTANT"];

function planesService($http, $q, appConstant) {
    this.buscarPtdsFacultad = buscarPtdsFacultad;
    this.buscarPtdsPrograma = buscarPtdsPrograma;
    this.buscarPtds = buscarPtds;
    this.buscarPtdsUser = buscarPtdsUser;

    function buscarPtdsFacultad(data) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarPtdsFacultad", data).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function buscarPtdsPrograma(data){
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarPtdsPrograma", data).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function buscarPtds(data){
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarPtds", data).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function buscarPtdsUser(data){
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarPtdsUser", data).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

}