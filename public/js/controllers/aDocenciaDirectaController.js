angular.module("iconic").controller("aDocenciaDirectaCtrl", aDocenciaDirectaCtrl);

aDocenciaDirectaCtrl.$inject = ["$rootScope", "DDService", "DDFactory", "ptdService", "ptdFactory", "loginFactory", "IPFactory", "ISFactory", "serviceNotification", "$q"];

function aDocenciaDirectaCtrl($rootScope, DDService, DDFactory, ptdService, ptdFactory, loginFactory, IPFactory, ISFactory, serviceNotification, $q) {
	var vm = this;
	var acciones = "";
	var max;
	var min;

	if ($rootScope.infoReady == true) {
		cargarDD();
	} else {
		$rootScope.$on("InfoReady", function () {
			cargarDD();
		});
	}

	function cargarDD() {
		$rootScope.$emit("PtdReady");
		$rootScope.PtdReady == true;
		DDFactory.buscarMaterias().then(function () {
			DDFactory.buscarDocenciaDirecta().then(function () {
				vm.docenciaDirecta = DDFactory.DocDir;
				calcularHorasDD();
				for (var i = 0; i < vm.docenciaDirecta.length; i++) {
					vm.docenciaDirecta[i].horas_semanales = DDFactory.materias.find(function (materia) {
						return vm.docenciaDirecta[i].tblMateriaCodigo == materia.codigo;
					});
					vm.docenciaDirecta[i].horas_semanales = vm.docenciaDirecta[i].horas_semanales.horas_semanales;
					cargarProgremaMateria({ tblMateriaCodigo: vm.docenciaDirecta[i].tblMateriaCodigo }, i);
				}
			});
			vm.materias = DDFactory.materias;
			cargarObservacion();
		});
		vm.permiso = loginFactory.estatus.permisos.find(function (permiso) {
			return permiso.tblRecursoId == 1;
		});

		vm.formDocenciaDirecta = {
			tblMateriaCodigo: '0',
			tblMateriaNombre: '0',
			grupo_asignatura: '',
			numero_estudiantes: '',
			horas_semanales: '',
			horas_semestrales: '',
			estudiante: '',
			jefe: '',
			tblPtdId: ''
		}
	}
	function cargarObservacion() {
		ptdFactory.buscarPtd({ ptd: ptdFactory.ptd.id }).then(function () {
			vm.observacion = {
				id: ptdFactory.ptd.id,
				observaciones_dd: ptdFactory.ptd.observaciones_dd
			};
		});
	}

	vm.accion = function () {
		cargarProgremaMateria({ tblMateriaCodigo: vm.formDocenciaDirecta.tblMateriaCodigo });
		if (acciones == "1") {
			saveDocenciaDirecta();
		} else {
			editDocenciaDirecta();
		}

	}

	function saveDocenciaDirecta() {
		DDService.guardarDD(vm.formDocenciaDirecta).then(function (res) {
			serviceNotification.success('Asignatura guardada correctamente', 3000);
			cargarDD();
		}).catch(function (err) {
			serviceNotification.error('No se guardó la asignatura', 2000);
		});
	}

	function editDocenciaDirecta() {
		DDService.modificarDD({ donde: vm.formDocenciaDirecta.id, datos: vm.formDocenciaDirecta }).then(function (res) {
			serviceNotification.success('Asignatura modificada correctamente', 3000);
			cargarDD();
		}).catch(function (err) {
			serviceNotification.error('No se modifico la asignatura', 2000);
		});
	}

	vm.deleteDocenciaDirecta = function (dd) {
		DDService.eliminarDD(dd).then(function (res) {
			serviceNotification.success('Asignatura eliminado correctamente', 3000);
			cargarDD();
		}).catch(function (err) {
			serviceNotification.error('No elimino la asignatura', 2000);
		});
	}

	vm.saveObservaciones = function () {
		ptdService.guardarPtd({ datos: vm.observacion }).then(function (res) {
			serviceNotification.success('Observación guardada correctamente', 3000);
			cargarObservacion();
		}).catch(function (err) {
			serviceNotification.error('No se guardó la Observación', 2000);
		});
	}

	vm.llenarModal = function (fe) {
		acciones = "2";
		vm.formDocenciaDirecta = {
			id: fe.id,
			tblMateriaCodigo: fe.tblMateriaCodigo,
			tblMateriaNombre: fe.tblMateriaNombre,
			grupo_asignatura: fe.grupo_asignatura,
			numero_estudiantes: fe.numero_estudiantes,
			horas_semanales: fe.horas_semanales,
			horas_semestrales: fe.horas_semestrales,
			estudiante: fe.estudiante,
			jefe: fe.jefe,
			tblPtdId: ptdFactory.ptd.id
		}
	}

	vm.vaciarMadal = function () {
		acciones = "1";
		vm.formDocenciaDirecta = {
			tblMateriaCodigo: '0',
			tblMateriaNombre: '0',
			grupo_asignatura: '',
			numero_estudiantes: '',
			horas_semanales: '',
			horas_semestrales: '',
			estudiante: '',
			jefe: '',
			tblPtdId: ptdFactory.ptd.id
		}
	}

	vm.asignarData = function (data) {
		info = DDFactory.materias.find(function (materia) {
			return data == materia.codigo || data == materia.nombre;
		});
		vm.formDocenciaDirecta.tblMateriaCodigo = info.codigo;
		vm.formDocenciaDirecta.tblMateriaNombre = info.nombre;
		vm.formDocenciaDirecta.horas_semanales = info.horas_semanales;
		DDFactory.buscarProgramaMateria({ tblMateriaCodigo: vm.formDocenciaDirecta.tblMateriaCodigo }).then(function () {
			vm.proMat = DDFactory.proMat;
			vm.formDocenciaDirecta.horas_semestrales = calculahoras(info.horas_semanales);
		});
		return vm.formDocenciaDirecta;
	}
	function cargarProgremaMateria(data, i) {
		DDFactory.buscarProgramaMateria(data).then(function () {
			vm.proMat = DDFactory.proMat;
			vm.docenciaDirecta[i].horas_semestrales = calculahoras(vm.docenciaDirecta[i].horas_semanales);
		});
	}
	function calculahoras(horas_semanales) {
		if (vm.proMat.tblProgramaCodigo == '53588' || vm.proMat.tblProgramaCodigo == '53587') {
			return horas_semanales * 18;
		} else {
			return horas_semanales * 16;
		}
	};

	(function () {
		if (loginFactory.user.dedicacion == 1) { min = 14; max = 18; }
		else if (loginFactory.user.dedicacion == 2) { min = 10; max = 14; }
		else if (loginFactory.user.dedicacion == 3) { min = 12; max = 18; }
		else { min = 8; max = 10; }
	})();

	function calcularHorasDD() {
		IPFactory.buscarInvestigacionesProyectos().then(function () {
			var investigacionesProyectos = sumarHoras(IPFactory.InvPro) / 2;
			ISFactory.buscarInvestigacionesSemilleros().then(function () {
				var investigacionesSemilleros = sumarHoras(ISFactory.InvSem) / 2;
				var docenciaDirecta = sumarHoras(DDFactory.DocDir);
				var docDicCompleta = docenciaDirecta + investigacionesProyectos + investigacionesSemilleros;
				if (max < docDicCompleta) {
					serviceNotification.warning('la suma de las horas de docencia directa y sus asimilables es mayor a la requerida', 2000);
				}else{
					if(min > docDicCompleta && loginFactory.perfil.id == 2){
						serviceNotification.warning('la suma de las horas de docencia directa y sus asimilables es menor a la requerida', 2000);
					}
				}
			});
		});
	}

	function sumarHoras(array) {
		var suma = 0;
		for (i = 0; i < array.length; i++) {
			suma += array[i].horas_semanales
		}
		return suma;
	}
};