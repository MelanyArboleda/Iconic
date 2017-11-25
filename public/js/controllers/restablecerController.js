angular.module("iconic").controller("restablecerCtrl", restablecerCtrl);

restablecerCtrl.$inject = ["loginService", "loginFactory", "serviceNotification", "$state"];

function restablecerCtrl(loginService, loginFactory, serviceNotification, $state) {
    var vm = this;
    vm.restablecer = restablecer;
    vm.passwordNew = "";
    vm.repitepassword = "";

    function restablecer() {
        if (vm.passwordNew === vm.repitepassword) {
            var data = {
                password: vm.passwordNew,
                doc_identidad: loginFactory.user.doc_identidad
            };
            loginService.compararcontraseñas(data).then(function (res) {
                $state.go("login");
            }).catch(function (err) {
                console.log(err);
                serviceNotification.warning('No puede ser igual a la contraseña anterior o por la de defecto', 2000);
            });
        } else {
            serviceNotification.error('Las Contraseñas no coinciden', 2000);
        }
    }
}