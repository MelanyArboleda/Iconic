angular.module("iconic").factory("ptdFactory", ptdFactory);

ptdFactory.$inject = ["ptdService", "serviceNotification", "$q"];

function ptdFactory(ptdService, serviceNotification, $q) {

    var factory = {
        aInfoGeneral: {},
        ptd: {},
        datosig:{},
        aobservacion: {},
        horasemestre: {
            DD: 0,
            OA: 0,
            IP: 0,
            IS: 0
        },
        createPtd: createPtd,
        buscarPtd: buscarPtd,
        cargarHoras: cargarHoras,
        buscarArea: buscarArea,
        buscarDedicacion: buscarDedicacion
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

    function buscarArea(user){
        var deferred = $q.defer();
        factory.datosig = {};        
        ptdService.buscarArea(user).then(function (area) {
            factory.datosig.area = area;
            deferred.resolve();
        }); 
        return deferred.promise; 
    }
    
    function buscarDedicacion(dedic){
        var deferred = $q.defer();
        ptdService.buscarDedicacion(dedic).then(function (dedicacion) {
            factory.datosig.dedicacion = dedicacion;
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