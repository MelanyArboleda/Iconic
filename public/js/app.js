angular.module("iconic", ["ui.router", "ui.materialize", 'LocalStorageModule']);

angular.module("iconic").run(["$state", "$rootScope", "loginFactory",
    function($state, $rootScope, loginFactory) {
        loginFactory.isLogin();

        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            console.log("Na na na", toState, toParams, fromState);
            console.log("Usuario--------",loginFactory.user);

            if (toParams.login) {
                var name = toState.name.split(".");
                if (name[0] != 'verificacion') {
                    console.log('verificacion')
                    if (loginFactory.user.estado == 3) {
                        console.log("enviar validar");
                        event.preventDefault();
                        $state.go("verificacion").then(function(res) {
                            console.log(res);
                        }).catch(function(res) {
                            console.log(res);
                        });;
                    } else if (name[0] != 'menuPrincipal') {
                        console.log('menuPrincipal')
                        if (loginFactory.user.estado == 1) {
                            console.log("enviar vistaPTD");
                            event.preventDefault();
                            $state.go("menuPrincipal.vistaPTD").then(function(res) {
                                console.log(res);
                            }).catch(function(res) {
                                console.log(res);
                            });;
                        }
                    }
                } else if (name[0] != 'configini') {
                    console.log('configini')
                    if (loginFactory.user.estado == 4) {
                        console.log("enviar configuracion");
                        event.preventDefault();
                        $state.go("configini").then(function(res) {
                            console.log(res);
                        }).catch(function(res) {
                            console.log(res);
                        });;
                    } else if (name[0] != 'menuPrincipal') {
                        console.log('menuPrincipal')
                        if (loginFactory.user.estado == 1) {
                            console.log("enviar vistaPTD");
                            event.preventDefault();
                            $state.go("menuPrincipal.vistaPTD").then(function(res) {
                                console.log(res);
                            }).catch(function(res) {
                                console.log(res);
                            });;
                        }
                    }
                }
                if (!loginFactory.userLogin) {
                    console.log("enviar al login");
                    event.preventDefault();
                    $state.go("login").then(function(res) {
                        console.log(res);
                    }).catch(function(res) {
                        console.log(res);
                    });;
                }
            }
        })
    }
]);

angular.module('iconic').config(["$qProvider", function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);