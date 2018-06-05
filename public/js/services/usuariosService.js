angular.module("iconic").service("usuariosService", usuariosService);

usuariosService.$inject = ["$http", "$q", "APP_CONSTANT"];

function usuariosService($http, $q, appConstant) {
    this.buscarUsuarios = buscarUsuarios;
    this.buscarUsuariosAdmin = buscarUsuariosAdmin;
    this.buscarEstados = buscarEstados;
    this.buscarPerfiles = buscarPerfiles;
    this.modificarUsuario = modificarUsuario;
    this.modificarPermiso = modificarPermiso;
    this.buscarRecursos = buscarRecursos;
    this.guardarArchivo = guardarArchivo;
    this.llenarDataBase = llenarDataBase;

    // llama servicio de buscar usuarios
    function buscarUsuarios(facultad) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/buscarUsuarios", facultad).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de buscar todos lo usuarios
    function buscarUsuariosAdmin(){
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/buscarUsuariosAdmin").then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de buscar estados
    function buscarEstados() {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/buscarEstados").then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de buscar perfiles
    function buscarPerfiles() {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/buscarPerfiles").then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de modificar usuarios
    function modificarUsuario(usuario) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/modificarUsuario", usuario).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de modificar permisos
    function modificarPermiso(permiso){
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/modificarPermiso", permiso).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de buscar recursos
    function buscarRecursos(){
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/buscarRecursos").then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
    
    // llama servicio de guardar archivos
    function guardarArchivo(xsl) {
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/guardarArchivo", xsl).then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }

    // llama servicio de llenas base de datos
    function llenarDataBase(){
        var deferred = $q.defer();
        $http.post(appConstant.LOCAL_SERVICE_ENDPOINT + "/llenarDataBase").then(function (res) {
            deferred.resolve(res.data);
        }, function (err) {
            deferred.reject(err);
            console.log(err);
        });
        return deferred.promise;
    }
}