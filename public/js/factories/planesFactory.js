angular.module("iconic").factory("planesFactory", planesFactory);

planesFactory.$inject = ["planesService", "$q"];

function planesFactory(planesService, $q) {

    var factoryPlanes = {
        ptds: [],
        buscarPtdsFacultad: buscarPtdsFacultad,
        buscarPtdsPrograma: buscarPtdsPrograma,
        buscarPtds: buscarPtds
    };
    return factoryPlanes;

    function buscarPtdsFacultad(data) {
        var deferred = $q.defer();
        factoryPlanes.ptds = [];
        planesService.buscarPtdsFacultad(data).then(function (result) {
            factoryPlanes.ptds = result;
            deferred.resolve();
        });
        return deferred.promise;    
    }

    function buscarPtdsPrograma(data){
        var deferred = $q.defer();
        factoryPlanes.ptds = [];
        planesService.buscarPtdsPrograma(data).then(function (result) {
            factoryPlanes.ptds = result;
            deferred.resolve();
        });
        return deferred.promise;    
    }

    function buscarPtds(data){
        var deferred = $q.defer();
        factoryPlanes.ptds = [];
        planesService.buscarPtds(data).then(function (result) {
            factoryPlanes.ptds = result;
            deferred.resolve();
        });
        return deferred.promise;   
    }
}