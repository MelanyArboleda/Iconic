angular.module("iconic").controller("configiniCtrl", configiniCtrl);

configiniCtrl.$inject = ["loginService", "loginFactory", "serviceNotification", "$state"];

function configiniCtrl(loginService, loginFactory, serviceNotification, $state) {
    var vm = this;
    vm.configini = configini;
    vm.passwordNew = "";
    vm.repitepassword = "";

    function configini() {
        if (vm.passwordNew == vm.repitepassword) {
            var data = {
                password: vm.passwordNew,
                doc_identidad: loginFactory.user.doc_identidad
            };
            console.log("llamando al comparador");
            loginService.compararcontraseñas(data).then(function (resultado) {
                loginFactory.user = resultado.user;
                console.log(resultado);
                serviceNotification.info('Bienvenido a ICONIC', 2000);
                $state.go("menuPrincipal.vistaPTD");
            }).catch(function (err) {
                console.log(err);
                serviceNotification.warning('No puede ser igual a la contraseña por defecto', 2000);
            });
        } else {
            serviceNotification.error('Las Contraseñas no coinciden', 2000);
            console.log('contraseñas no coinciden')
        }

    }
}