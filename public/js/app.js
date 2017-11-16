angular.module("iconic", ["ui.router", "ui.materialize", 'LocalStorageModule']);

angular.module("iconic").run(["$state", "$rootScope", "loginFactory", "loginService",
    function ($state, $rootScope, loginFactory, loginService) {
        loginFactory.isLogin();

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            console.log("Rutas", toState, toParams, fromState);
            console.log("Usuario--------", loginFactory.user);
            if (toParams.login) {
                var name = toState.name.split(".");
                if (loginFactory.user.estado == 1) {
                    console.log("estado 1", loginFactory.user.estado)
                    if (name[0] != 'menuPrincipal') {
                        menuPrincipal();
                    }
                } else {
                    if (loginFactory.user.estado == 2) {
                        console.log("estado 2", loginFactory.user.estado)
                        login();//si esta inactivo mando al login y muestro mensaje
                    } else {
                        if (loginFactory.user.estado == 3) {
                            console.log("estado 3", loginFactory.user.estado)
                            if (name[0] != 'verificacion') {
                                if (loginFactory.codigoVerificacion != null) {
                                    verificacion();//si encuentra un codigo para validar
                                } else {
                                    login();//si el codigo de verificacion esta nulo se envia al login y muestro mensaje
                                }
                            }
                        } else {
                            if (loginFactory.user.estado == 4) {
                                console.log("estado 4", loginFactory.user.estado)
                                if (name[0] != 'configini') {
                                    configini();//el estado del usuario es igual a 4
                                }
                            } else {
                                loginFactory.isLogin().then(function (resp) {
                                    if (name[0] == 'menuPrincipal') {
                                        menuPrincipal();
                                    } else {
                                        loginFactory.cambiarEstado().then(function (resp) {
                                            loginFactory.logout();//cierro la sesion si no tengo usuario en el sistema
                                        });
                                    }
                                });
                            }
                        }
                    }
                }
            } else {
                if (toState.name == "restablecer") {
                    if (loginFactory.user.doc_identidad == null && toParams.id != null) {
                        loginService.validarDatos({ id: toParams.id, fecha: toParams.fecha }).then(function (resp) {
                            loginFactory.user.doc_identidad = resp.data.id;
                        }).catch(function (res) {
                            login();
                        });
                    }
                }
            }

            function login() {
                console.log("enviar al login");
                event.preventDefault();
                $state.go("login").then(function (res) {
                    console.log(res);
                }).catch(function (res) {
                    console.log(res);
                });;
            }
            function menuPrincipal() {
                console.log("enviar vistaPTD");
                var url = toState.url.substring(1);
                event.preventDefault();
                $state.go("menuPrincipal." + url).then(function (res) {
                    console.log(res);
                }).catch(function (res) {
                    console.log(res);
                });
            }
            function verificacion() {
                console.log("enviar varificar");
                event.preventDefault();
                $state.go("verificacion").then(function (res) {
                    console.log(res);
                }).catch(function (res) {
                    console.log(res);
                });
            }
            function configini() {
                console.log("enviar configuracion");
                event.preventDefault();
                $state.go("configini").then(function (res) {
                    console.log(res);
                }).catch(function (res) {
                    console.log(res);
                });
            }
        });
    }
]);

angular.module('iconic').config(["$qProvider", function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);