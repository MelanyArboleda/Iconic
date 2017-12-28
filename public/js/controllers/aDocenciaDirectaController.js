angular.module("iconic").controller("aDocenciaDirectaCtrl", aDocenciaDirectaCtrl);

aDocenciaDirectaCtrl.$inject = ["DDService", "DDFactory", "ptdService", "ptdFactory", "loginFactory", "serviceNotification", "$q"];

function aDocenciaDirectaCtrl(DDService, DDFactory, ptdService, ptdFactory, loginFactory, serviceNotification, $q) {
	var vm = this;
	var acciones = "";
	var max;
	var min;
	cargarDD();
	function cargarDD() {
		loginFactory.cargarEstatus().then(function () {
			DDFactory.buscarMaterias().then(function () {
				DDFactory.buscarDocenciaDirecta().then(function () {
					vm.docenciaDirecta = DDFactory.DocDir;
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
			vm.permiso = loginFactory.estatus.permisos.find(function (permiso){
				return permiso.tblRecursoId == 1;
			});
		});

		vm.accion = accion;
		vm.llenarModal = llenarModal;
		vm.vaciarMadal = vaciarMadal;
		vm.asignarData = asignarData;
		vm.saveObservaciones = saveObservaciones;
		vm.deleteDocenciaDirecta = deleteDocenciaDirecta;
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

	function accion() {
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

	function deleteDocenciaDirecta(dd) {
		DDService.eliminarDD(dd).then(function (res) {
			serviceNotification.success('Asignatura eliminado correctamente', 3000);
			cargarDD();
		}).catch(function (err) {
			serviceNotification.error('No elimino la asignatura', 2000);
		});
	}

	function saveObservaciones() {
		ptdService.guardarPtd({ datos: vm.observacion }).then(function (res) {
			serviceNotification.success('Observación guardada correctamente', 3000);
			cargarObservacion();
		}).catch(function (err) {
			serviceNotification.error('No se guardó la Observación', 2000);
		});
	}

	function llenarModal(fe) {
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

	function vaciarMadal() {
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

	function asignarData(data) {
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
		else { min = 8; max = 10; }
	})();
};