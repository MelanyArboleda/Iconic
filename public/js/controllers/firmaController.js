angular.module("iconic").controller("firmaCtrl", firmaCtrl);

firmaCtrl.$inject = ["loginService", "loginFactory", "serviceNotification", "$q", "$scope"];

function firmaCtrl(loginService, loginFactory, serviceNotification, $q, $scope) {
    var vm = this;
    vm.firma = "img/firma.png";
    vm.siguiente = false;
    vm.password = "";
    vm.repitepassword = "";

    vm.prefirmar = function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.addEventListener("load", function () {
            $scope.$apply(function () {
                vm.firma = reader.result;
            });
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    vm.firmar = function () {
        if (vm.firma != "img/firma.png") {
            var formato = vm.firma.substring(vm.firma.indexOf("/") + 1, vm.firma.indexOf(";"));
            vm.firma = vm.firma.replace(formato, "formato");
            vm.siguiente = true;
        } else {
            serviceNotification.error('No se selecciono una firma', 2000);
        }
    }

    vm.passwordFirma = function() {
        if (vm.password == vm.repitepassword) {
            var data = {
                contraseña_firma: vm.password,
                doc_identidad: loginFactory.user.doc_identidad,
                firma: vm.firma 
            };
            loginService.guardarFirma(data).then(function (res) {
                serviceNotification.success('Se guardó la firma', 3000);
            }).catch(function (err) {
                console.log(err);
                if (err.status == 401) {
                    serviceNotification.warning('No puede ser igual a la contraseña de sesion', 2000);
				}
				if (err.status == 403) {
                    serviceNotification.error('No se guardó la firma', 2000);
				}
            });
        } else {
            serviceNotification.error('Las Contraseñas no coinciden', 2000);
        }
    }

    vm.borrar = function(){
        vm.firma = "img/firma.png";
        vm.siguiente = false;
    }
}