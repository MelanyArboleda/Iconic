var app = angular.module("iconic").controller("menuPrincipalCtrl", menuPrincipalCtrl);

menuPrincipalCtrl.$inject = ["$rootScope", "ptdFactory", "planesFactory", "loginFactory", "fechaEtapaFactory", "RGFactory", "serviceNotification", "$state", "$q"];

function menuPrincipalCtrl($rootScope, ptdFactory, planesFactory, loginFactory, fechaEtapaFactory, RGFactory, serviceNotification, $state, $q) {
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
	var daysmax = 0;
	var daysmin = 150;
	var daysminExt = 1;
	var daysmaxExt = 150;
	vm.minDate = (new Date(vm.currentTime.getTime() - (1000 * 60 * 60 * 24 * daysmin))).toISOString();
	vm.maxDate = (new Date(vm.currentTime.getTime() + (1000 * 60 * 60 * 24 * daysmax))).toISOString();

	var fechaSel = vm.fecha_inicio;

	vm.minDateIExt = (new Date(vm.currentTime.getTime() - (1000 * 60 * 60 * 24 * daysmin))).toISOString();
	vm.maxDateIExt = (new Date(vm.currentTime.getTime() + (1000 * 60 * 60 * 24 * daysmax))).toISOString();

	vm.minDateFExt = fechaSel;
	vm.maxDateFExt = (new Date(vm.currentTime.getTime() + (1000 * 60 * 60 * 24 * daysmaxExt))).toISOString();


	function emitInfoReady() {
		$rootScope.$emit("InfoReady");
		$rootScope.infoReady = true;
	}

	if ($rootScope.urlReady == true) {
		cargarMenu();
	} else {
		$rootScope.$on("UrlReady", function () {
			cargarMenu();
		});
	}

	function cargarMenu() {
		console.log("se metio por menu", $rootScope.urlReady);
		fechaEtapaFactory.buscarFechaEtapa().then(function () {
			console.log("Fechas--------", fechaEtapaFactory.fechaEtapa);
			if (loginFactory.user.perfil == 1) {
				if (ptdFactory.ptd.id == undefined || ptdFactory.ptd.tblUsuarioDocIdentidad != loginFactory.user.doc_identidad) {
					if (fechaEtapaFactory.fechaEtapa.length == 0) {
						serviceNotification.info('El decano no a creado las fechas de las etapas por lo tanto no se puede crear un plan de trabajo para este semestre', 3000);
						vm.plan = false;
						emitInfoReady();
					} else {
						ptdFactory.createPtd({ doc_identidad: loginFactory.user.doc_identidad }).then(function (ptd) {
							console.log("PTD--------", ptd);
							vm.plan = true;
							RGFactory.crearResumenGeneral(ptd.id).then(function (resumen) {
								console.log("resumen--------", resumen);
								emitInfoReady();
							});
						});
					}
				} else {
					emitInfoReady();
				}
			} else {
				if (loginFactory.user.perfil == 4) {
					emitInfoReady();
				} else {
					if (fechaEtapaFactory.fechaEtapa.length == 0) {
						$state.go("menuPrincipal.fechaEtapa");
						emitInfoReady();
					} else {
						var data = fechaEtapaFactory.fechaEtapa[fechaEtapaFactory.fechaEtapa.length - 1];
						planesFactory.buscarPtds({
							id: loginFactory.estatus.facultad.id, semestre: data.semestre, ano: data.ano
						}).then(function () {
							console.log("PTDS----------", planesFactory.ptds);
							vm.ptds = planesFactory.ptds;
							emitInfoReady($rootScope.infoReady = true);
						});
					}
				}
			}
		});
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
			case 9: $state.go("menuPrincipal.AdocenciaDirecta", { idPlanDeTrabajo: ptdFactory.ptd.id });
				break;
			case 10: $state.go("menuPrincipal.AdocenciaDirecta", { idPlanDeTrabajo: ptdFactory.ptd.id });
				break;
		}
	}

	vm.validFechaFinal = function (ext) {
		if (ext.fecha_inicial) {
			var auxFechaInicial = new Date(ext.fecha_inicial);
			console.log(auxFechaInicial);
			console.log(auxFechaFinal);
			if (ext.fecha_final) {
				var auxFechaFinal = new Date(ext.fecha_final);
				console.log(auxFechaFinal);
				if (auxFechaFinal < auxFechaInicial) {
					delete ext.fecha_final;
				}
			}
			// ext.fechaFinalValida = (new Date(auxFechaInicial.getTime() + (1000 * 60 * 60 * 24 * 1))).toISOString();
		}
	}

	vm.menu = function (ruta) {
		if (ruta == 1) {
			$state.go("menuPrincipal.vistaPTD");
		} else {
			if (ruta == 2) {
				$state.go("menuPrincipal.vistaPTD");
			} else {
				$state.go("menuPrincipal.Usuarios");
			}
		}
	}
};