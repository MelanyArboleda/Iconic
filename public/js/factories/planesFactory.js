angular.module("iconic").factory("planesFactory", planesFactory);

planesFactory.$inject = ["planesService", "$q"];

function planesFactory(planesService, $q) {

    var factoryPlanes = {
        ptds: [],
        buscarPtds: buscarPtds
    };
    return factoryPlanes;

    function buscarPtds(facultad) {
        var deferred = $q.defer();
        factoryPlanes.ptds = [];
        planesService.buscarPtds(facultad).then(function (result) {
            factoryPlanes.ptds = result;
            deferred.resolve();
        });
        return deferred.promise;    
    }
}