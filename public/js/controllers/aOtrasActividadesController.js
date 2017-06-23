angular.module("iconic").controller("aOtrasActividadesCtrl", aOtrasActividadesCtrl);

aOtrasActividadesCtrl.$inject = ["ptdService", "ptdFactory", "serviceNotification"];

function aOtrasActividadesCtrl(ptdService, ptdFactory, serviceNotification) {
    var vm = this;
    vm.aOtrasActividades = aOtrasActividades;

    vm.otrasActividades = [{
        actividad: "Atención a estudiantes",
        hSemanaO: 12,
        hSemestreO: 56,
        descProductos: "Nada",
        totalHS: "",
        hSemanaTotal: "",
        hSemestreTotal: "",
        observacionesOA: "",
    }];

    function aOtrasActividades() {
        console.log("llama a servicio Save de otras actividades");
		ptdService.save(vm.otrasActividades).then(function(resultado){
			ptdFactory.apOtrasActividades = resultado.apOtrasActividades;
			ptdFactory.ptd = resultado.ptd;
			console.log(resultado);
		}).catch(function(err){
			console.log(err);
			serviceNotification.error('Error . ', 2000);
		});
        console.log(vm.otrasActividades);
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