angular.module("iconic").factory("ptdFactory", ptdFactory);

ptdFactory.$inject = ["ptdService", "serviceNotification", "$q"];

function ptdFactory(ptdService, serviceNotification, $q, ) {

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
        createPtd: createPtd,
        buscarApart: buscarApart,
    };
    return factory;

    function createPtd(user) {
        ptdService.createPtd(user).then(function(result) {
            factory.ptd = result.ptd;
        });
    }

    function buscarApart(id) {
        ptdService.buscarApart(id).then(function(result) {
            factory.adocenciadirecta = result.adocenciadirecta;
        });
    }
}