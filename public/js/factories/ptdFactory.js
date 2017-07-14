angular.module("iconic").factory("ptdFactory", ptdFactory);

ptdFactory.$inject = ["ptdService", "serviceNotification", "$q"];

function ptdFactory(ptdService, serviceNotification, $q) {

    var factory = {
        aInfoGeneral: {},
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
        horasemestre: {
            docenciaDirecta: 0,
            otrasActividades: 0,
            proyectosInvestigaciones: 0,
            gruposInvestigaciones: 0
        },
        createPtd: createPtd,
        buscarPtd: buscarPtd,
        buscarApartDD: buscarApartDD,
        buscarApartIG: buscarApartIG,
        buscarApartIP: buscarApartIP,
        buscarApartEP: buscarApartEP,
        buscarApartCE: buscarApartCE,
        buscarApartPP: buscarApartPP,
        buscarApartAP: buscarApartAP,
        buscarApartOA: buscarApartOA,
        buscarResumen: buscarResumen,
        cargarHoras: cargarHoras
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
        factory.horasemestre.docenciaDirecta = 0;
        ptdService.buscarApart(apartado).then(function (result) {
            factory.adocenciadirecta = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }

    function buscarApartIG(apartado) {
        var deferred = $q.defer();
        factory.ainvestigacionesgrupo = [];
        factory.horasemestre.gruposInvestigaciones = 0;
        ptdService.buscarApart(apartado).then(function (result) {
            factory.ainvestigacionesgrupo = result.apartado;
            deferred.resolve();
        });
        return deferred.promise;
    }

    function buscarApartIP(apartado) {
        var deferred = $q.defer();
        factory.ainvestigacionesproyecto = [];
        factory.horasemestre.proyectosInvestigaciones = 0;
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
        factory.horasemestre.otrasActividades = 0;
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

    function cargarHoras() {
        var deferred = $q.defer();
        var horaArreglo1 = obtenerhorasemanales(factory.adocenciadirecta);
        var horaArreglo2 = obtenerhorasemanales(factory.ainvestigacionesgrupo);
        var horaArreglo3 = obtenerhorasemanales(factory.ainvestigacionesproyecto);
        var horaArreglo4 = obtenerhorasemanales(factory.aotrasactividades);
        var totalHoras1 = horaArreglo1 + horaArreglo2 + horaArreglo3 + horaArreglo4;

        var horaArreglo5 = obtenerhorasemestrales(factory.aextension);
        var horaArreglo6 = obtenerhorasemestrales(factory.aproyecto);
        var horaArreglo7 = obtenerhorasemestrales(factory.aasesoria);
        var hotalHoras2 = horaArreglo5 + horaArreglo6 + horaArreglo7;

        ptdService.buscarApart({ tabla: 'tbl_resumenes', ptd: factory.ptd.id }).then(function (result) {
            console.log('nnnnnnnnnnnnnnn', result.apartado);
            datos = {
                tblPtdId: factory.ptd.id,
                id: result.apartado.id,
                horas_semanales_tot: totalHoras1,
                horas_semestrales_tot: (hotalHoras2 + factory.horasemestre.docenciaDirecta + factory.horasemestre.otrasActividades + factory.horasemestre.proyectosInvestigaciones + factory.horasemestre.gruposInvestigaciones),
            }
            data = {
                tabla: 'tbl_resumenes',
                datos: datos
            }
            ptdService.save(data).then(function (resultado) {
                deferred.resolve();
            }).catch(function (err) {
                deferred.resolve();
                console.log(err);
            });
        });

        return deferred.promise;
    }

    function obtenerhorasemanales(arreglo) {
        var acum = 0;
        for (var i = 0; i < arreglo.length; i++) {
            acum += arreglo[i].horas_semanales
        }
        return acum
    }
    function obtenerhorasemestrales(arreglo) {
        var acum = 0;
        for (var i = 0; i < arreglo.length; i++) {
            acum += arreglo[i].horas_semestrales
        }
        return acum
    }
}