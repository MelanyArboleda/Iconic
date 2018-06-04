var app = angular.module("iconic").controller("menuPrincipalCtrl", menuPrincipalCtrl);

menuPrincipalCtrl.$inject = ["$rootScope", "ptdFactory", "SEFactory", "usuariosFactory", "planesFactory", "loginFactory", "fechaEtapaFactory", "RGFactory", "ObservacionesFactory", "serviceNotification", "$state", "$q", "modalNotifService"];

function menuPrincipalCtrl($rootScope, ptdFactory, SEFactory, usuariosFactory, planesFactory, loginFactory, fechaEtapaFactory, RGFactory, ObservacionesFactory, serviceNotification, $state, $q, modalNotifService) {
	var vm = this;
	var currentTime = new Date();
	vm.currentTime = currentTime;
	vm.month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
	vm.monthShort = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
	vm.weekdaysFull = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
	vm.weekdaysLetter = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
	vm.disable = [false, 1, 7];
	vm.today = 'Hoy';
	vm.clear = 'Limpiar';
	vm.close = 'Cerrar';
	var daysmax = 150;
	var daysmin = 0;
	vm.minDate = (new Date(vm.currentTime.getTime() - (1000 * 60 * 60 * 24 * daysmin))).toISOString();
	vm.maxDate = (new Date(vm.currentTime.getTime() + (1000 * 60 * 60 * 24 * daysmax))).toISOString();

	function emitInfoReady() {
		$rootScope.$emit("InfoReady");
		$rootScope.infoReady = true;
	}

	function emitPtdReady() {
		$rootScope.$emit("PtdReady");
		$rootScope.PtdReady == true;
	}

	if ($rootScope.urlReady == true) {
		cargarMenu();
	} else {
		$rootScope.$on("UrlReady", function () {
			cargarMenu();
		});
	}

	function cargarMenu() {
		vm.pageName = $rootScope.page;
		vm.perfilUser = loginFactory.user.perfil;
		if (loginFactory.user.perfil == 7) {
			vm.plan = false;
			emitInfoReady();
		} else {
			fechaEtapaFactory.buscarFechaEtapa().then(function () {
				console.log("Fechas--------", fechaEtapaFactory.fechaEtapa);
				var fechaApro = fechaEtapaFactory.fechaEtapa.find((fecha)=>{
					return fecha.tblEtapaId == 3;
				});
				
				var fechaSeg = fechaEtapaFactory.fechaEtapa.find((fecha)=>{
					return fecha.tblEtapaId == 4;
				});

				var fechaEva = fechaEtapaFactory.fechaEtapa.find((fecha)=>{
					return fecha.tblEtapaId == 5;
				});

				if (fechaSeg) {
					if (new Date(fechaSeg.fecha_inicial) <  new Date() && new Date(fechaSeg.fecha_final) >  new Date() ) {
						vm.seguimiento = true;
					}else{
						vm.seguimiento = false;
					}
				}

				if (fechaEva) {
					if (new Date(fechaEva.fecha_inicial) <  new Date() && new Date(fechaEva.fecha_final) >  new Date() ) {
						vm.evaluacion = true;
					}else{
						vm.evaluacion = false;
					}
				}
				

				if (fechaApro) {
					if (new Date(fechaApro.fecha_inicial) <  new Date() && new Date(fechaApro.fecha_final) >  new Date() ) {
						vm.firme = true;
					}else{
						vm.firme = false;
					}
				}
				
				if (loginFactory.user.perfil == 1) {
					if (ptdFactory.ptd.id == undefined || ptdFactory.ptd.tblUsuarioDocIdentidad != loginFactory.user.doc_identidad) {
						if (fechaEtapaFactory.fechaEtapa.length == 0) {
							modalNotifService.openModal('¡Hola!, Aún no han sido creadas desde tu facultad las fechas para la presentación de tu plan de trabajo, comunícate con ellos si tienes alguna duda');
							vm.plan = false;
							emitInfoReady();
						} else {
							ptdFactory.createPtd({ doc_identidad: loginFactory.user.doc_identidad }).then(function (ptd) {
								console.log("PTD--------", ptd);
								vm.plan = true;
								RGFactory.crearResumenGeneral(ptd.id).then(function (resumen) {
									console.log("resumen--------", resumen);
									ObservacionesFactory.crearObservaciones(ptd.id).then(function () {
										SEFactory.crearSE(ptd.id,6).then(function(){
											SEFactory.crearSE(ptd.id,23).then(function(){
												emitPtdReady();
												emitInfoReady();
											})
										})
									});
								});

							});
						}
					} else {
						emitInfoReady();
					}
				} else {
					if (loginFactory.user.perfil == 2) {
						if (fechaEtapaFactory.fechaEtapa.length == 0) {
							$state.go("menuPrincipal.fechaEtapa");
							emitInfoReady();
						} else {
							var data = fechaEtapaFactory.fechaEtapa[fechaEtapaFactory.fechaEtapa.length - 1];
							planesFactory.buscarPtdsFacultad({
								facultad: loginFactory.estatus.facultad.id, semestre: data.semestre, ano: data.ano
							}).then(function () {
								console.log("PTDS----------", planesFactory.ptds);
								vm.ptds = planesFactory.ptds;
								usuariosFactory.buscarUsuarios().then(() => {
									vm.usersPtd = [];
									var userPtdV = usuariosFactory.users.find((user) => {
										return user.tblPerfileId == 1;
									});				
									vm.usersPtd.push(userPtdV);				
									for (let i = 0; i < vm.ptds.length; i++) {
										var nombre = vm.usersPtd.find((user)=>{
											return user.doc_identidad == vm.ptds[i].tblUsuarioDocIdentidad;
										});
										vm.ptds[i].nombre = nombre.nombre;
									}
								});
								vm.ptdId = $rootScope.ptd;
								emitInfoReady();
							});
						}
					} else {
						if (loginFactory.user.perfil == 4) {
							if (fechaEtapaFactory.fechaEtapa.length == 0) {
								modalNotifService.openModal('¡Hola!, Aún no han sido creadas desde tu facultad las fechas para modificar tu plan de trabajo, Comunícate con ellos si tienes alguna duda');
								vm.plan = false;
								emitInfoReady();
							} else {
								var data = fechaEtapaFactory.fechaEtapa[fechaEtapaFactory.fechaEtapa.length - 1];
								planesFactory.buscarPtdsPrograma({
									programa: loginFactory.estatus.programa, semestre: data.semestre, ano: data.ano
								}).then(function () {
									console.log("PTDS----------", planesFactory.ptds);
									vm.ptds = planesFactory.ptds;
									usuariosFactory.buscarUsuarios().then(() => {
										vm.usersPtd = [];
										var userPtdV = usuariosFactory.users.find((user) => {
											return user.tblPerfileId == 1;
										});				
										vm.usersPtd.push(userPtdV);				
										for (let i = 0; i < vm.ptds.length; i++) {
											var nombre = vm.usersPtd.find((user)=>{
												return user.doc_identidad == vm.ptds[i].tblUsuarioDocIdentidad;
											});
											vm.ptds[i].nombre = nombre.nombre;
										}
									});
									vm.ptdId = $rootScope.ptd;
									emitInfoReady();
								});
							}
						} else {
							if (fechaEtapaFactory.fechaEtapa.length == 0) {
								modalNotifService.openModal('¡Hola!, Aún no han sido creadas desde tu facultad las fechas para modificar tu plan de trabajo, Comunícate con ellos si tienes alguna duda');
								vm.plan = false;
								emitInfoReady();
							} else {
								var data = fechaEtapaFactory.fechaEtapa[fechaEtapaFactory.fechaEtapa.length - 1];
								planesFactory.buscarPtds({
									semestre: data.semestre, ano: data.ano
								}).then(function () {
									console.log("PTDS----------", planesFactory.ptds);
									vm.ptds = planesFactory.ptds;
									emitInfoReady();
								});
							}
						}
					}
				}
			});
		}
		vm.permisos = loginFactory.estatus.permisos.sort(function (a, b) {
			return (a.tblRecursoId - b.tblRecursoId)
		});
		vm.permisoFecha = loginFactory.estatus.permisos.find(function (permiso) {
			return permiso.tblRecursoId == 11;
		});
		vm.permisoConsertacion = loginFactory.estatus.permisos.find(function (permiso) {
			return permiso.tblRecursoId == 14;
		});
	}
	vm.cargarPTD = function (ptd) {
		ptdFactory.ptd = ptd;
		vm.ptdId = ptd.id;
		console.log("PTD-----------", ptdFactory.ptd);
		emitPtdReady();
		vm.enrutarPTD();
	}

	vm.enrutarPTD = function () {
		var recurso = null;
		var i = 0;
		while (recurso == null) {
			if (loginFactory.estatus.permisos[i].ver == true) {
				recurso = loginFactory.estatus.permisos[i];
			}
			i++;
		}

		switch (recurso.tblRecursoId) {
			case 1: ($state.go("menuPrincipal.AdocenciaDirecta", { idPlanDeTrabajo: ptdFactory.ptd.id }));
				break;
			case 2: $state.go("menuPrincipal.AinvestigacionesS", { idPlanDeTrabajo: ptdFactory.ptd.id });
				break;
			case 3: $state.go("menuPrincipal.Aextension", { idPlanDeTrabajo: ptdFactory.ptd.id });
				break;
			case 4: $state.go("menuPrincipal.AcomisionEstudios", { idPlanDeTrabajo: ptdFactory.ptd.id });
				break;
			case 5: $state.go("menuPrincipal.Aproyectos", { idPlanDeTrabajo: ptdFactory.ptd.id });
				break;
			case 6: $state.go("menuPrincipal.Aasesorias", { idPlanDeTrabajo: ptdFactory.ptd.id });
				break;
			case 7: $state.go("menuPrincipal.AotrasActividades", { idPlanDeTrabajo: ptdFactory.ptd.id });
				break;
			case 8: $state.go("menuPrincipal.Aobservaciones", { idPlanDeTrabajo: ptdFactory.ptd.id });
				break;
			case 9: $state.go("menuPrincipal.SeguimientoEvaluacion", { idPlanDeTrabajo: ptdFactory.ptd.id });
				break;
		}
	}

	vm.validFechaFinal = function (fecha_inicial) {
		var auxFechaInicial = new Date(fecha_inicial);
		vm.minDateFinal = (new Date(auxFechaInicial.getTime() + (1000 * 60 * 60 * 24 * 1))).toISOString();
	}
};