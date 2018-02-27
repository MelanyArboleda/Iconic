angular.module("iconic", ["ui.router", "ui.materialize", 'LocalStorageModule']);

angular.module("iconic").run(["$state", "$rootScope", "loginFactory", "ptdFactory", "loginService",
    function ($state, $rootScope, loginFactory, ptdFactory, loginService) {
        function emitUrlReady() {
            $rootScope.$emit("UrlReady");
            $rootScope.urlReady = true;
        }
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            console.log("Rutas", toState, toParams, fromState);
            loginFactory.isLogin().then(function () {
                if (toParams.login) {
                    if (loginFactory.userLogin) {
                        console.log("Usuario--------", loginFactory.user);
                        var name = toState.name.split(".");
                        if (loginFactory.user.estado == 1) {
                            console.log("estado 1", loginFactory.user.estado);
                            loginFactory.cargarEstatus().then(function () {
                                console.log("Estatus--------", loginFactory.estatus);
                                if (name[0] != 'menuPrincipal') {
                                    menuPrincipal();
                                } else {
                                    if (toState.recurso != 0) {
                                        var permiso = loginFactory.estatus.permisos.find(function (permisos) {
                                            return permisos.tblRecursoId === toState.recurso;
                                        });

                                        if (permiso.ver == true) {
                                            if (ptdFactory.ptd == 0 && loginFactory.user.perfil != 1) {
                                                ptdFactory.buscarPtd({ ptd: toParams.idPlanDeTrabajo }).then(function () {
                                                    emitUrlReady();
                                                });
                                            } else {
                                                emitUrlReady();
                                            }
                                        } else {
                                            enrutador(fromState.url);
                                        }
                                    } else {
                                        emitUrlReady();
                                    }
                                }
                            });
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
                                    }
                                }
                            }
                        }
                    } else {
                        login();
                    }
                } else {
                    if (loginFactory.userLogin) {
                        menuPrincipal();
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
                }
            });

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
                console.log("enviar menuPrincipal");
                var url = toState.url.substring(1);
                if (url == "login") {
                    url = "vistaPTD"
                }
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
            function enrutador(ruta) {
                console.log("enviar enrutar");
                var url = ruta.substring(1);
                event.preventDefault();
                emitUrlReady();
                $state.go("menuPrincipal." + url).then(function (res) {
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