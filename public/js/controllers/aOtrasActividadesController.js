angular.module("iconic").controller("aOtrasActividadesCtrl", aOtrasActividadesCtrl);

aOtrasActividadesCtrl.$inject = ["ptdService", "ptdFactory", "serviceNotification", "$q"];

function aOtrasActividadesCtrl(ptdService, ptdFactory, serviceNotification, $q) {
    var vm = this;
    vm.aOtrasActividades = aOtrasActividades;
    ptdFactory.cargarHoras().then(function () {
        buscarResumen();
    });
    function buscarResumen() {
        var deferred = $q.defer();
        ptdFactory.buscarResumen({ tabla: 'tbl_resumenes', ptd: ptdFactory.ptd.id }).then(function () {
            vm.resumen = {
                tblPtdId: ptdFactory.ptd.id,
                id: ptdFactory.resumen.id,
                horas_semanales_tot: ptdFactory.resumen.horas_semanales_tot,
                horas_semestrales_tot: ptdFactory.resumen.horas_semestrales_tot,
                observaciones: ptdFactory.resumen.observaciones,
                observacion_ptd: ptdFactory.resumen.observacion_ptd,
            };
            deferred.resolve(buscarApartOA());
        });
        return deferred.promise;
    }
    function buscarApartOA() {
        ptdFactory.buscarApartOA({ tabla: 'tbl_actividades', id: ptdFactory.resumen.id }).then(function () {
            vm.otrasActividades = ptdFactory.aotrasactividades;
            for (var i = 0; i < vm.otrasActividades.length; i++) {
                var semestre = vm.calculahoras(vm.otrasActividades[i]);
                ptdFactory.horasemestre.otrasActividades += semestre;
            }
        });
    }

    function aOtrasActividades() {
        data = {
            datos: vm.resumen,
            tabla: 'tbl_resumenes'
        }
        console.log("llama a servicio Save de resumen");
        ptdService.save(data).then(function (resultado) {
            var id = ptdFactory.resumen.id;
            buscarResumen().then(function (callback) {
                actividades(id);
            });
            serviceNotification.success('Resumen guardado correctamente', 3000);
        }).catch(function (err) {
            console.log(err);
            serviceNotification.error('No se guardó el apartado R', 2000);
        });
    }

    function actividades(id) {
        for (var i = 0; i < vm.otrasActividades.length; i++) {
            vm.otrasActividades[i].tblResumeneId = id,
                data = {
                    datos: vm.otrasActividades[i],
                    tabla: 'tbl_actividades'
                }
            console.log("llama a servicio Save de otras actividades");
            ptdService.save(data).then(function (resultado) {
                if (angular.toJson(resultado) == angular.toJson(vm.otrasActividades[i - 1]) || resultado.id == undefined) {
                    serviceNotification.success('Actividades guardado correctamente', 3000);
                    buscarApartOA();
                }
            }).catch(function (err) {
                console.log(err);
                serviceNotification.error('No se guardó el apartado A', 2000);
            });
        }
    }


    vm.addNewOAct = function (oact) {
        vm.otrasActividades.push({
            'nombre_actividad': "",
            'horas_semanales': "",
            'horas_semestrales': "",
            'descripcion_productos': "",
        });
    };
    vm.removeOAct = function () {
        var newDataList = [];
        vm.selectedAll = false;
        angular.forEach(vm.otrasActividades, function (selected) {
            if (!selected.selected) {
                newDataList.push(selected);
            }
        });
        vm.otrasActividades = newDataList;
    };
    vm.checkAllOAct = function () {
        if (!vm.selectedAll) {
            vm.selectedAll = true;
        } else {
            vm.selectedAll = false;
        }
        angular.forEach(vm.otrasActividades, function (otrasActividades) {
            otrasActividades.selected = vm.selectedAll;
        });
    };
    vm.calculahoras = function (otras) {
        return (otras.horas_semestrales = otras.horas_semanales * 18);
    };
};