angular.module("iconic").controller("aOtrasActividadesCtrl", aOtrasActividadesCtrl);

aOtrasActividadesCtrl.$inject = ["ptdService", "ptdFactory", "serviceNotification"];

function aOtrasActividadesCtrl() {
    var vm = this;
    vm.aOtrasActividades = aOtrasActividades;

    vm.otrasActividades = ptdFactory.aotrasactividades;
    vm.resumen = {
        tblPtdId: ptdFactory.ptd.id,
        horas_semanales_tot: "",
        horas_semestrales_tot: "",
        observaciones: ptdFactory.resumen.observaciones,
        observacion_ptd: ptdFactory.resumen.observacion_ptd,
    };

    function aOtrasActividades() {
        data = {
            datos: vm.resumen,
            tabla: 'tbl_resumen'
        }
        console.log("llama a servicio Save de resumen");
        ptdService.save(data).then(function (resultado) {
            ptdFactory.resumen[resultado.apartado.id - 1] = resultado.apartado;
            serviceNotification.success('Apartado guardado correctamente', 2000);
        }).catch(function (err) {
            console.log(err);
            serviceNotification.error('No se guardó el apartado', 2000);
        });
        for (var i = 0; i < vm.otrasActividades.length; i++) {
            vm.otrasActividades[i].tblResumenId = ptdFactory.resumen.id,
                data = {
                    datos: vm.otrasActividades[i],
                    tabla: 'tbl_actividades'
                }
            console.log("llama a servicio Save de otras actividades");
            ptdService.save(data).then(function (resultado) {
                ptdFactory.aotrasactividades[resultado.apartado.id - 1] = resultado.apartado;
            }).catch(function (err) {
                console.log(err);
                serviceNotification.error('Error . ', 2000);
            });
        }
    }

    vm.addNewOAct = function (oact) {
        vm.otrasActividades.push({
            'actividad': "",
            'hSemanaO': "",
            'hSemestreO': "",
            'descProductos': "",
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
};