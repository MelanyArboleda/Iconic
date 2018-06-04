angular.module("iconic").factory("RGFactory", RGFactory);

RGFactory.$inject = ["RGService", "ptdFactory", "DDFactory", "ISFactory", "IPFactory", "AEFactory", "CEFactory", "FPFactory", "APFactory", "OAFactory", "$q"];

function RGFactory(RGService, ptdFactory, DDFactory, ISFactory, IPFactory, AEFactory, CEFactory, FPFactory, APFactory, OAFactory, $q) {
    var factoryRG = {
        ResGen: {},
        crearResumenGeneral: crearResumenGeneral,
        buscarResumenGeneral: buscarResumenGeneral,
        modificarResumenGeneral: modificarResumenGeneral,
        horasCnx: 0
    }
    var ddSemestre = 0;
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

    function modificarResumenGeneral() {
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
            var dd = obtenerhorasemanales(DDFactory.DocDir);
            ddSemestre = 0;
            calcularHorasSemestreDD(DDFactory.DocDir);
            ISFactory.buscarInvestigacionesSemilleros().then(function () {
                var is = obtenerhorasemanalesinv(ISFactory.InvSem);
                IPFactory.buscarInvestigacionesProyectos().then(function () {
                    var ip = obtenerhorasemanalesinv(IPFactory.InvPro);
                    AEFactory.buscartActividadesExtension().then(function () {
                        var ae = obtenerhorasemestrales(AEFactory.ExtPro);
                        FPFactory.buscarFormulacionProyectos().then(function () {
                            var fp = obtenerhorasemestrales(FPFactory.ForPro);
                            APFactory.buscarAsesoriasProyectos().then(function () {
                                var ap = obtenerhorasemestrales(APFactory.AsePro);
                                OAFactory.buscarOtrasActividades(factoryRG.ResGen.id).then(function () {
                                    var oa = obtenerhorasemanales(OAFactory.OtrAct);
                                    factoryRG.horasCnx = dd*1.5;
                                    var totalHorasSemana = dd + is + ip + oa;
                                    var totalHorasSemestre = ae + fp + ap + ddSemestre + (is * 22.5) + (ip * 22.5) + (oa * 22.5);// y mirar bien que actividades se multimplican por 18 o 22.5
                                    deferred.resolve({ semana: totalHorasSemana, semestre: totalHorasSemestre });
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
    function obtenerhorasemanalesinv(apartado) {
        var acum = 0;
        for (var i = 0; i < apartado.length; i++) {
            // if (apartado[i].tblVinculoId == 1 || apartado[i].tblVinculoId == 3) {
                acum += apartado[i].horas_semanales;
            // }
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

    function calcularHorasSemestreDD(apartado) {
        for (var i = 0; i < apartado.length; i++) {
            calculahoras(apartado[i].horas_semanales);
        }
    }

    function calculahoras(horas_semanales) {
        ddSemestre += horas_semanales * 18;
    };

}