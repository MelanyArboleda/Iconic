angular.module("iconic").controller("firmaCtrl", firmaCtrl);

firmaCtrl.$inject = ["loginService", "loginFactory", "serviceNotification", "$q", "$scope"];

function firmaCtrl(loginService, loginFactory, serviceNotification, $q, $scope) {
    var vm = this;
    vm.prefirmar = prefirmar;
    vm.firmar = firmar;
    vm.firma = "img/firma.png";

    function prefirmar(event) {
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

    function firmar() {
        var formato = vm.firma.substring(vm.firma.indexOf("/")+1, vm.firma.indexOf(";"));
        vm.firma = vm.firma.replace(formato, "formato");
        loginService.guardarFirma({ doc_identidad: loginFactory.user.doc_identidad, firma: vm.firma }).then(function (res) {
            //siga
        }).catch(function (err) {
            console.log(err);
            serviceNotification.error('No se guardó la firma', 2000);
        });
    }
}