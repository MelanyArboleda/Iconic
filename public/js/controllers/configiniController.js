angular.module("iconic").controller("configiniCtrl", configiniCtrl);

configiniCtrl.$inject = ["loginService", "loginFactory", "serviceNotification", "$state"];

function configiniCtrl(loginService, loginFactory, serviceNotification, $state) {
    var vm = this;
    vm.configini = configini;
    vm.passwordNew = "";
    vm.repitepassword = "";

    function configini() {
        if (vm.passwordNew == vm.repitepassword) {
            if (vm.passwordNew != '123') {
                var data = {
                    password: vm.passwordNew,
                    doc_identidad: loginFactory.user.doc_identidad
                };
                console.log("llamando al comparador");
                loginService.compararcontraseñas(data).then(function (resultado) {
                    loginFactory.user = resultado.user;
                    console.log(resultado);
                    $state.go("menuPrincipal.vistaPTD");
                }).catch(function (err) {
                    console.log(err);
                    serviceNotification.error('Error . ', 2000);
                });
            } else {
                console.log('contraseña invalida')
            }
        } else {
            console.log('contraseñas no coinciden')
        }

    }
}