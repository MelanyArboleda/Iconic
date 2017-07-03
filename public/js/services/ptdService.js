angular.module("iconic").service("ptdService", ptdService);

ptdService.$inject = ["$http", "$q"];

function ptdService($http, $q) {
    this.save = save;
    this.createPtd = createPtd;
    this.buscarApart = buscarApart;

    function save(ptd) {
        var deferred = $q.defer();
        console.log("llegó al servivioptd");
        $http.post("http://localhost:3000/auth/save", ptd).then(function (res) {
            console.log(res);
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function createPtd(user) {
        var deferred = $q.defer();
        console.log("creando ptd");
        $http.post("http://localhost:3000/auth/createPtd", user).then(function (res) {
            console.log(res);
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function buscarApart(apartado) {
        var deferred = $q.defer();
        console.log("buscando apartado");
        $http.post("http://localhost:3000/auth/buscarApart", apartado).then(function (res) {
            console.log(res);
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

}