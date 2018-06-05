angular.module("iconic").factory("usuariosFactory", usuariosFactory);

usuariosFactory.$inject = ["usuariosService", "loginService", "loginFactory","$q"];

function usuariosFactory(usuariosService, loginService, loginFactory, $q) {
    var factoryUser = {
        users:[],
        estados:[],
        perfiles:[],
        permisos:[],
        recursos:[],
        buscarUsuarios: buscarUsuarios,
        buscarEstados: buscarEstados,
        buscarPerfiles: buscarPerfiles,
        cargarPermisos: cargarPermisos,
        buscarRecursos: buscarRecursos
    }
    return factoryUser;

    function buscarUsuarios(){
        var deferred = $q.defer();
        factoryUser.users = [];
        if (loginFactory.user.perfil == 7) {
            usuariosService.buscarUsuariosAdmin().then(function (result) {
                factoryUser.users = result.users;
                deferred.resolve();
            });
        }else{
            usuariosService.buscarUsuarios({id: loginFactory.estatus.facultad.id}).then(function (result) {
                factoryUser.users = result.users;
                deferred.resolve();
            });
        }
        return deferred.promise;
    }

    function buscarEstados(){
        var deferred = $q.defer();
        factoryUser.estados = [];
        usuariosService.buscarEstados().then(function (result) {
            factoryUser.estados = result.estados;
            deferred.resolve();
        });
        return deferred.promise;
    }

    function buscarPerfiles(){
        var deferred = $q.defer();
        factoryUser.perfiles = [];
        usuariosService.buscarPerfiles().then(function (result) {
            factoryUser.perfiles = result.perfiles;
            deferred.resolve();
        });
        return deferred.promise;
    }

    function cargarPermisos(user) {
		var deferred = $q.defer();
		loginService.buscarPermisos({ tblUsuarioDocIdentidad: user }).then(function (permisos) {
			factoryUser.permisos = permisos;
			deferred.resolve();
		});
		return deferred.promise;
    }

    function buscarRecursos(){
        var deferred = $q.defer();
		usuariosService.buscarRecursos().then(function (result) {
			factoryUser.recursos = result.recursos;
			deferred.resolve();
		});
		return deferred.promise;
    }
    
}