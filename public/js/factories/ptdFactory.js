angular.module("iconic").factory("ptdFactory", ptdFactory);

ptdFactory.$inject = ["ptdService", "serviceNotification", "$q"];

function ptdFactory(ptdService, serviceNotification, $q ) {

    var factory = {
        ptd: {},
        adocenciadirecta: [],
        ainvestigacionesgrupo: [],
        ainvestigacionesproyecto: [],
        aobservacion: {},
        acomision: [],
        aproyecto: [],
        aextension: [],
        aasesoria: [],
        aotrasactividades: [],
        resumen: {},
        createPtd: createPtd,
        buscarPtd: buscarPtd,
        buscarApartDD: buscarApartDD,
        buscarApartIG: buscarApartIG,
        buscarApartIP:buscarApartIP,
        buscarApartEP:buscarApartEP,
        buscarApartCE:buscarApartCE,
        buscarApartPP:buscarApartPP,
        buscarApartAP:buscarApartAP,
        buscarApartOA:buscarApartOA,
        buscarResumen:buscarResumen
    };
    return factory;

    function createPtd(user) {
        ptdService.createPtd(user).then(function (result) {
            factory.ptd = result.ptd;
        });
    }

    function buscarPtd(apartado) {
        var deferred = $q.defer();
        factory.ptd = {};
        ptdService.buscarApart(apartado).then(function (result) {
            factory.ptd = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }

    function buscarApartDD(apartado) {
        var deferred = $q.defer();
        factory.adocenciadirecta = [];
        ptdService.buscarApart(apartado).then(function (result) {
            factory.adocenciadirecta = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }

    function buscarApartIG(apartado) {
        var deferred = $q.defer();
        factory.ainvestigacionesgrupo = [];
        ptdService.buscarApart(apartado).then(function (result) {
            factory.ainvestigacionesgrupo = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }

    function buscarApartIP(apartado) {
        var deferred = $q.defer();
        factory.ainvestigacionesproyecto = [];
        ptdService.buscarApart(apartado).then(function (result) {
            factory.ainvestigacionesproyecto = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }

    function buscarApartEP(apartado) {
        var deferred = $q.defer();
        factory.aextension = [];
        ptdService.buscarApart(apartado).then(function (result) {
            factory.aextension = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }

    function buscarApartCE(apartado) {
        var deferred = $q.defer();
        factory.acomision = [];
        ptdService.buscarApart(apartado).then(function (result) {
            factory.acomision = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }

    function buscarApartPP(apartado) {
        var deferred = $q.defer();
        factory.aproyecto = [];
        ptdService.buscarApart(apartado).then(function (result) {
            factory.aproyecto = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }

    function buscarApartAP(apartado) {
        var deferred = $q.defer();
        factory.aasesoria = [];
        ptdService.buscarApart(apartado).then(function (result) {
            factory.aasesoria = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }

    function buscarApartOA(apartado) {
        var deferred = $q.defer();
        factory.aotrasactividades = [];
        ptdService.buscarApart(apartado).then(function (result) {
            factory.aotrasactividades = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }

    function buscarResumen(apartado) {
        var deferred = $q.defer();
        factory.resumen = {};
        ptdService.buscarApart(apartado).then(function (result) {
            factory.resumen = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }
}