angular.module("iconic").factory("RGFactory", RGFactory);

RGFactory.$inject = ["RGService", "ptdFactory", "DDFactory", "ISFactory", "IPFactory", "AEFactory", "CEFactory", "FPFactory", "APFactory", "OAFactory", "serviceNotification", "$q"];

function RGFactory(RGService, ptdFactory, DDFactory, ISFactory, IPFactory, AEFactory, CEFactory, FPFactory, APFactory, OAFactory, serviceNotification, $q) {
    var factoryRG = {
        ResGen: {},
        crearResumenGeneral: crearResumenGeneral,
        buscarResumenGeneral: buscarResumenGeneral,
        modificarResumenGeneral: modificarResumenGeneral
    }
    return factoryRG;

    function crearResumenGeneral(ptdId) {
        var deferred = $q.defer();
        factoryRG.ResGen = {};
        var datos = {
            horas_semanales_tot: 0,
            horas_semestrales_tot: 0,
            observaciones: '',
            tblPtdId: ptdId
        }
        RGService.crearRG(datos).then(function (result) {
            factoryRG.ResGen = result.resumen;
            deferred.resolve();
        });
        return deferred.promise;
    }

    function buscarResumenGeneral() {
        var deferred = $q.defer();
        factoryRG.ResGen = {};
        RGService.buscarRG({ ptd: ptdFactory.ptd.id }).then(function (result) {
            factoryRG.ResGen = result.resumen;
            deferred.resolve();
        });
        return deferred.promise;
    }

    function modificarResumenGeneral(){
        var deferred = $q.defer();
        cargarApartados().then(function (horas) {
            var datos = {
                id: factoryRG.ResGen.id,
                horas_semanales_tot: horas.semana,
                horas_semestrales_tot: horas.semestre,
                observaciones: factoryRG.ResGen.observaciones,
                tblPtdId: factoryRG.ResGen.tblPtdId
            }
            RGService.modificarRG(datos).then(function (result) {
                deferred.resolve();
            });
        });
        return deferred.promise;
    }

    function cargarApartados() {
        var deferred = $q.defer();
        DDFactory.buscarDocenciaDirecta().then(function () {
            DDFactory.buscarMaterias().then(function () {
                for (var i = 0; i < DDFactory.DocDir.length; i++) {
                    DDFactory.DocDir[i].horas_semanales = DDFactory.materias.find(function (materia) {
                        return DDFactory.DocDir[i].tblMateriaCodigo == materia.codigo;
                    });
                    DDFactory.DocDir[i].horas_semanales = DDFactory.DocDir[i].horas_semanales.horas_semanales;
                }
                var dd = obtenerhorasemanales(DDFactory.DocDir);
                ISFactory.buscarInvestigacionesSemilleros().then(function () {
                    var is = obtenerhorasemanales(ISFactory.InvSem);
                    IPFactory.buscarInvestigacionesProyectos().then(function () {
                        var ip = obtenerhorasemanales(IPFactory.InvPro);
                        AEFactory.buscartActividadesExtension().then(function () {
                            var ae = obtenerhorasemestrales(AEFactory.ExtPro);
                            FPFactory.buscarFormulacionProyectos().then(function () {
                                var fp = obtenerhorasemestrales(FPFactory.ForPro);
                                APFactory.buscarAsesoriasProyectos().then(function () {
                                    var ap = obtenerhorasemestrales(APFactory.AsePro);
                                    OAFactory.buscarOtrasActividades(factoryRG.ResGen.id).then(function () {
                                        var oa = obtenerhorasemanales(OAFactory.OtrAct);
                                        var totalHorasSemana = dd + is + ip + oa;//validar el programa del usuario para saber si son 16 o 18
                                        var totalHorasSemestre = ae + fp + ap + (dd * 16) + (is * 22.5) + (ip * 22.5) + (oa * 22.5);// y mirar bien que actividades se multimplican por 18 o 22.5
                                        deferred.resolve({semana :totalHorasSemana, semestre:totalHorasSemestre});
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
        return deferred.promise;
    };

    function obtenerhorasemanales(apartado) {
        var acum = 0;
        for (var i = 0; i < apartado.length; i++) {
            acum += apartado[i].horas_semanales;
        }
        return acum
    }
    function obtenerhorasemestrales(apartado) {
        var acum = 0;
        for (var i = 0; i < apartado.length; i++) {
            acum += apartado[i].horas_semestrales;
        }
        return acum
    }
}