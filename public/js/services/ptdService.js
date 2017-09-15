angular.module("iconic").service("ptdService", ptdService);

ptdService.$inject = ["$http", "$q"];

function ptdService($http, $q) {
    this.createPtd = createPtd;
    this.buscarPtd = buscarPtd;
    this.guardarPtd = guardarPtd;
    this.buscarArea = buscarArea;
    this.buscarDedicacion = buscarDedicacion;

    function createPtd(user) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/createPtd", user).then(function (res) {
            console.log(res);
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function buscarPtd(ptd) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/buscarPtd", ptd).then(function (res) {
            console.log(res);
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function guardarPtd(ptd) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/guardarPtd", ptd).then(function (res) {
            console.log(res);
            deferred.resolve(res.config.data.datos);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function buscarArea(user) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/buscarArea", user).then(function (res) {
            deferred.resolve(res.data.area);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    function buscarDedicacion(user) {
        var deferred = $q.defer();
        $http.post("http://localhost:3000/auth/buscarDedicacion", user).then(function (res) {
            deferred.resolve(res.data.dedicacion);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}