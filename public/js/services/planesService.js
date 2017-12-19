angular.module("iconic").service("planesService", planesService);

planesService.$inject = ["$http", "$q", "APP_CONSTANT"];

function planesService($http, $q, appConstant) {
    this.buscarPtds = buscarPtds;

    function buscarPtds(facultad) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT+"/buscarPtds", facultad).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

}