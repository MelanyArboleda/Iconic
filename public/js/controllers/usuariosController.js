angular.module("iconic").controller("usuariosCtrl", usuariosCtrl);

usuariosCtrl.$inject = ["$rootScope", "usuariosFactory", "usuariosService", "loginFactory", "serviceNotification", "$q"];

function usuariosCtrl($rootScope,usuariosFactory, usuariosService, loginFactory, serviceNotification, $q) {
    var vm = this;
    var nombreu;
    var apellido_1u;
    var apellido_2u;
    
    if($rootScope.infoReady == true){
		cargarUSER();
	}else{
		$rootScope.$on("InfoReady",function(){
			cargarUSER();
		});
	}
    function cargarUSER() {
            usuariosFactory.buscarUsuarios().then(function () {
                vm.usuarios = usuariosFactory.users;
                usuariosFactory.buscarEstados().then(function () {
                    for (var i = 0; i < vm.usuarios.length; i++) {
                        vm.usuarios[i].tblEstadoId = usuariosFactory.estados.find(function (estado) {
                            return vm.usuarios[i].tblEstadoId === estado.id;
                        });
                        vm.usuarios[i].tblEstadoId = vm.usuarios[i].tblEstadoId.estado;
                    }
                    vm.estados = [];
                    for (var i = 0; i < usuariosFactory.estados.length; i++) {
                        if (usuariosFactory.estados[i].id == 1 || usuariosFactory.estados[i].id == 2) {
                            vm.estados.push(usuariosFactory.estados[i]);
                        }
                    }
                });
                vm.permisoUser = loginFactory.estatus.permisos.find(function (permiso) {
                    return permiso.tblRecursoId == 15;
                });
                vm.permisoPermiso = loginFactory.estatus.permisos.find(function (permiso) {
                    return permiso.tblRecursoId == 12;
                });
                usuariosFactory.buscarPerfiles().then(function () {
                    for (var i = 0; i < vm.usuarios.length; i++) {
                        vm.usuarios[i].tblPerfileId = usuariosFactory.perfiles.find(function (perfil) {
                            return vm.usuarios[i].tblPerfileId === perfil.id;
                        });
                        vm.usuarios[i].tblPerfileId = vm.usuarios[i].tblPerfileId.perfil;
                    }
                });
            });
        vm.formUsuario = {
            doc_identidad: '',
            nombre: '',
            apellido_1: '',
            apellido_2: '',
            correo: '',
            tblPerfileId: '',
            tblEstadoId: ''
        };
    };

    vm.saveUsuario = function () {
        vm.formUsuario.tblPerfileId = usuariosFactory.perfiles.find(function (perfil) {
            return vm.formUsuario.tblPerfileId === perfil.perfil;
        });
        vm.formUsuario.tblPerfileId = vm.formUsuario.tblPerfileId.id;

        vm.formUsuario.tblEstadoId = usuariosFactory.estados.find(function (estado) {
            return vm.formUsuario.tblEstadoId === estado.estado;
        });
        vm.formUsuario.tblEstadoId = vm.formUsuario.tblEstadoId.id;
        vm.formUsuario.nombre = nombreu;
        vm.formUsuario.apellido_1 = apellido_1u;
        vm.formUsuario.apellido_2 = apellido_2u;
        usuariosService.modificarUsuario({ donde: vm.formUsuario.doc_identidad, datos: vm.formUsuario }).then(function (res) {
            serviceNotification.success('Usuario guardado correctamente', 3000);
            cargarUSER();
        }).catch(function (err) {
            serviceNotification.error('No se pudo guardar el usuario', 2000);
        });
    }

    vm.llenarModal = function (user) {
        vm.formUsuario = {
            doc_identidad: user.doc_identidad,
            nombre: user.nombre + ' ' + user.apellido_1 + ' ' + user.apellido_2,
            correo: user.correo,
            tblPerfileId: user.tblPerfileId,
            tblEstadoId: user.tblEstadoId
        }
        if (user.tblEstadoId == "Activo" || user.tblEstadoId == "Inactivo") {
            vm.estado = true;
        } else {
            vm.estado = false;
        }
        nombreu = user.nombre;
        apellido_1u = user.apellido_1;
        apellido_2u = user.apellido_2;
    }

    vm.llenarModalPermisos = function (user) {
        usuariosFactory.cargarPermisos(user.doc_identidad).then(function () {
            vm.permisos = usuariosFactory.permisos;
            usuariosFactory.buscarRecursos().then(function () {
                for (var i = 0; i < vm.permisos.length; i++) {
                    vm.permisos[i].tblRecursoId = usuariosFactory.recursos.find(function (recurso) {
                        return vm.permisos[i].tblRecursoId === recurso.id;
                    });
                    vm.permisos[i].tblRecursoId = vm.permisos[i].tblRecursoId.recurso;
                }
            });
        });
    }

    vm.modificarPermiso = function (permiso) {
        permiso.tblRecursoId = usuariosFactory.recursos.find(function (recurso) {
            return permiso.tblRecursoId === recurso.recurso;
        });
        permiso.tblRecursoId = permiso.tblRecursoId.id;
        usuariosService.modificarPermiso(permiso).then(function (resp) {
            serviceNotification.success('Permiso guardado correctamente', 3000);
            vm.llenarModalPermisos({ doc_identidad: permiso.tblUsuarioDocIdentidad });
        }).catch(function (err) {
            serviceNotification.error('No se pudo guardar el permiso', 2000);
        });
    }
}