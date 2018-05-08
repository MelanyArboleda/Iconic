angular.module("iconic").service("DDService", DDService);

DDService.$inject = ["$http", "$q", "APP_CONSTANT"];

function DDService($http, $q, appConstant) {
    this.buscarDD = buscarDD;
    this.modificarDD = modificarDD;
    this.eliminarDD = eliminarDD;

    // llama servicio de buscar docencia directa
    function buscarDD(dd) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/buscarDD", dd).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}