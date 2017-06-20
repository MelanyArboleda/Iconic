var app = angular.module("iconic").controller("menuPrincipalCtrl", function() {

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
	var days = 15;
	vm.minDate = (new Date(vm.currentTime.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
	vm.maxDate = (new Date(vm.currentTime.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();
	
	vm.dedicacionUs = ['Tiempo Completo', 'Medio Tiempo', 'Ocasional MT'];
	vm.areaUs = ['Programas Informáticos'];

	//Docencia Directa
	vm.docenciaDirecta = [
	        {
	            'nAsignatura':'Identificación del ciclo de vida del software',
	            'codigo':'ING00812',
	            'grupo':61,
	            'numEstudiantes':27,
	            'hSemana':3,
	            'hSemestreD':51,
	            'evaluacionestudiante': 2,
	            'evaluacionjefe': 1,
	        }];
	        vm.addNewDD = function(dd){
            	vm.docenciaDirecta.push({ 
		            'nAsignatura':"",
		            'codigo':"",
		            'grupo':"",
		            'numEstudiantes':"",
		            'hSemana':"",
		            'hSemestreD':"",
		            'evaluacionestudiante':"",
		            'evaluacionjefe':"",
            	});
        	};
	        vm.removeDD = function(){
	            var newDataList=[];
	            vm.selectedAll = false;
	            angular.forEach(vm.docenciaDirecta, function(selected){
	                if(!selected.selected){
	                    newDataList.push(selected);
	                }
	            }); 
	            vm.docenciaDirecta = newDataList;
	        };
	        vm.checkAllDD = function () {
	            if (!vm.selectedAll) {
	                vm.selectedAll = true;
	            } else {
	                vm.selectedAll = false;
	            }
	            angular.forEach(vm.docenciaDirecta, function (docenciaDirecta) {
	                docenciaDirecta.selected = vm.selectedAll;
	            });
	        };
	        //Extensión
	        vm.extension = [
	        {
	            'nomActividad':'Diplomado en fotografía',
	            'fechaI':"",
	            'fechaF':"",
	            'hSemestreE':27,
	            'vb': "",
	        }];
	        vm.addNewExt = function(ext){
            	vm.extension.push({ 
			        'nomActividad':"",
		            'fechaI':"",
		            'fechaF':"",
		            'hSemestreE':"",
		            'vb':"",
            	});
        	}; 
	        vm.removeExt = function(){
	            var newDataList=[];
	            vm.selectedAll = false;
	            angular.forEach(vm.extension, function(selected){
	                if(!selected.selected){
	                    newDataList.push(selected);
	                }
	            }); 
	            vm.extension = newDataList;
	        };
	        vm.checkAllExt = function () {
	            if (!vm.selectedAll) {
	                vm.selectedAll = true;
	            } else {
	                vm.selectedAll = false;
	            }
	            angular.forEach(vm.extension, function (extension) {
	                extension.selected = vm.selectedAll;
	            });
	        };
	        // Comisión de estudios
	        vm.comisionE = [
	        {
	            'universidad':'UNAM',
	            'tipoEstudio':"Tecnología",
	            'nombreEstudio':"Tec. en sistemati. de datos",
	            'fechaIni':"",
	            'fechaG': "",
	            'fechaOA':"",
	            'aportes':"Dormir",
	        }];
	        vm.addNewComE = function(comE){
            	vm.comisionE.push({ 
			    'universidad':"",
	            'tipoEstudio':"",
	            'nombreEstudio':"",
	            'fechaIni':"",
	            'fechaG': "",
	            'fechaOA':"",
	            'aportes':"",
            	});
        	}; 
	        vm.removeComE = function(){
	            var newDataList=[];
	            vm.selectedAll = false;
	            angular.forEach(vm.comisionE, function(selected){
	                if(!selected.selected){
	                    newDataList.push(selected);
	                }
	            }); 
	            vm.comisionE = newDataList;
	        };
	        vm.checkAllcomE = function () {
	            if (!vm.selectedAll) {
	                vm.selectedAll = true;
	            } else {
	                vm.selectedAll = false;
	            }
	            angular.forEach(vm.comisionE, function (comisionE) {
	                comisionE.selected = vm.selectedAll;
	            });
	        }; 
	        //Proyectos
	        vm.proyectos = [
	        {
	            'nomArticulo':'Diplomado en fotografía',
	            'autorcoautor':"Coautor",
	            'temaP':"Estudiar cámaras",
	            'hSemestreP':123,
	        }];
	        vm.addNewProy = function(proy){
            	vm.proyectos.push({ 
			    'nomArticulo':"",
	            'autorcoautor':"",
	            'temaP':"",
	            'hSemestreP':"",
            	});
        	}; 
	        vm.removeProy = function(){
	            var newDataList=[];
	            vm.selectedAll = false;
	            angular.forEach(vm.proyectos, function(selected){
	                if(!selected.selected){
	                    newDataList.push(selected);
	                }
	            }); 
	            vm.proyectos = newDataList;
	        };
	        vm.checkAllProy = function () {
	            if (!vm.selectedAll) {
	                vm.selectedAll = true;
	            } else {
	                vm.selectedAll = false;
	            }
	            angular.forEach(vm.proyectos, function (proyectos) {
	                proyectos.selected = vm.selectedAll;
	            });
	        }; 
	        //Asesorías en Proyectos
	        vm.asesorias = [
	        {
	            'integrantes':'Julian Moreno',
	            'titulo':"Polidocentes",
	            'aspectosR':"mi ver",
	            'hSemestreA':20,
	            'evalEstudiante':5,
	            'evalJefe':1,
	        }];
	        vm.addNewAse = function(ase){
            	vm.asesorias.push({ 
			    'integrantes':"",
	            'titulo':"",
	            'aspectosR':"",
	            'hSemestreA':"",
	            'evalEstudiante':"",
	            'evalJefe':"",
            	});
        	}; 
	        vm.removeAse = function(){
	            var newDataList=[];
	            vm.selectedAll = false;
	            angular.forEach(vm.asesorias, function(selected){
	                if(!selected.selected){
	                    newDataList.push(selected);
	                }
	            }); 
	            vm.asesorias = newDataList;
	        };
	        vm.checkAllAse = function () {
	            if (!vm.selectedAll) {
	                vm.selectedAll = true;
	            } else {
	                vm.selectedAll = false;
	            }
	            angular.forEach(vm.asesorias, function (asesorias) {
	                asesorias.selected = vm.selectedAll;
	            });
	        }; 
	        //Otras Actividades Académicas
	        vm.otrasActividades = [
	        {
	            'actividad':"Atención a estudiantes",
	            'hSemanaO':12,
	            'hSemestreO':56,
	            'descProductos':"Nada",
	        }];
	        vm.addNewOAct = function(oact){
            	vm.otrasActividades.push({ 
			    'actividad':"",
	            'hSemanaO':"",
	            'hSemestreO':"",
	            'descProductos':"",
            	});
        	}; 
	        vm.removeOAct = function(){
	            var newDataList=[];
	            vm.selectedAll = false;
	            angular.forEach(vm.otrasActividades, function(selected){
	                if(!selected.selected){
	                    newDataList.push(selected);
	                }
	            }); 
	            vm.otrasActividades = newDataList;
	        };
	        vm.checkAllOAct = function () {
	            if (!vm.selectedAll) {
	                vm.selectedAll = true;
	            } else {
	                vm.selectedAll = false;
	            }
	            angular.forEach(vm.otrasActividades, function (otrasActividades) {
	                otrasActividades.selected = vm.selectedAll;
	            });
	        }; 

	        vm.gruposInvestigacion = [
	        {
	            'ngrupo':'VACAAAAAS :v',
	            'vinculo': 'Director',
	            'actividad': 'Ver las vacas',
	            'productos': 'Dibujo de las vacas',
	            'hSemana': 10,
	            'hSemestre': 60,
	        }];
	    
	        vm.gInvAddNew = function(gruposInvestigacion){
            	vm.gruposInvestigacion.push({ 
		            'ngrupo': "",
		            'vinculo': "",
		            'actividad': "",
		            'productos': "",
		            'hSemana': "",
		            'hSemestre': "",
            	});
        	};
	    
	        vm.gInvRemove = function(){
	            var newDataList=[];
	            vm.selectedAll = false;
	            angular.forEach(vm.gruposInvestigacion, function(selected){
	                if(!selected.selected){
	                    newDataList.push(selected);
	                }
	            }); 
	            vm.gruposInvestigacion = newDataList;
	        };
	    
	        vm.gInvCheckAll = function () {
	            if (!vm.selectedAll) {
	                vm.selectedAll = true;
	            } else {
	                vm.selectedAll = false;
	            }
	            angular.forEach(vm.gruposInvestigacion, function (gruposInvestigacion) {
	                gruposInvestigacion.selected = vm.selectedAll;
	            });
	        }; 

	        vm.proyectosInvestigacion = [
	        {
	            'nproyecto':'VACAAAAAS :v',
	            'vinculo': 'Investigador principal',
	            'objetivo': 'Ver las vacas',
	            'productos': 'Dibujo de las vacas',
	            'hSemana': 10,
	            'hSemestre': 60
	        }];
	    
	        vm.pInvAddNew = function(proyectosInvestigacion){
            	vm.proyectosInvestigacion.push({ 
		            'nproyecto': "",
		            'vinculo': "",
		            'objetivo': "",
		            'productos': "",
		            'hSemana': "",
		            'hSemestre': ""
            	});
        	};
	    
	        vm.pInvRemove = function(){
	            var newDataList=[];
	            vm.selectedAll = false;
	            angular.forEach(vm.proyectosInvestigacion, function(selected){
	                if(!selected.selected){
	                    newDataList.push(selected);
	                }
	            }); 
	            vm.proyectosInvestigacion = newDataList;
	        };
	    
	        vm.pInvCheckAll = function () {
	            if (!vm.selectedAll) {
	                vm.selectedAll = true;
	            } else {
	                vm.selectedAll = false;
	            }
	            angular.forEach(vm.proyectosInvestigacion, function (proyectosInvestigacion) {
	                proyectosInvestigacion.selected = vm.selectedAll;
	            });
	        }; 
});

