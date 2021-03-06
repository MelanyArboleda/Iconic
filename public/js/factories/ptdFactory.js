angular.module("iconic").factory("ptdFactory", ptdFactory);

ptdFactory.$inject = ["ptdService", "$q"];

function ptdFactory(ptdService, $q) {

    var factory = {
        ptd: 0,
        createPtd: createPtd,
        buscarPtd: buscarPtd
    };
    return factory;

    function createPtd(user) {
        var deferred = $q.defer();
        ptdService.createPtd(user).then(function (result) {
            factory.ptd = result.ptd;
            deferred.resolve(result.ptd);
        });
        return deferred.promise;
    }

    function buscarPtd(apartado) {
        var deferred = $q.defer();
        factory.ptd = {};
        ptdService.buscarPtd(apartado).then(function (result) {
            factory.ptd = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;    
    }
}