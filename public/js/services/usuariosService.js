angular.module("iconic").service("usuariosService", usuariosService);

usuariosService.$inject = ["$http", "$q", "APP_CONSTANT"];

function usuariosService($http, $q, appConstant) {
    // this.buscarMaterias = buscarMaterias;

    // function buscarDD(dd) {
    //     var deferred = $q.defer();
    //     $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/buscarDD", dd).then(function (res) {
    //         deferred.resolve(res.data);
    //     }, function (err) {
    //         deferred.reject(err);
    //         console.log(err);
    //     });
    //     return deferred.promise;
    // }
}