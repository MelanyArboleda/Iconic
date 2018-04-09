angular.module("iconic").controller("restablecerCtrl", restablecerCtrl);

restablecerCtrl.$inject = ["loginService", "loginFactory", "serviceNotification", "$state"];

function restablecerCtrl(loginService, loginFactory, serviceNotification, $state) {
    var vm = this;
    vm.passwordNew = "";
    vm.repitepassword = "";

    vm.restablecer = function() {
        if (vm.passwordNew === vm.repitepassword) {
            var data = {
                password: vm.passwordNew,
                doc_identidad: loginFactory.user.doc_identidad
            };
            loginService.compararcontraseñas(data).then(function (res) {
                $state.go("login");
            }).catch(function (err) {
                console.log(err);
                serviceNotification.warning('La nueva contraseña no debe ser igual a la anterior ni la por defecto', 2000);
            });
        } else {
            serviceNotification.error('Las Contraseñas no coinciden', 2000);
        }
    }
}