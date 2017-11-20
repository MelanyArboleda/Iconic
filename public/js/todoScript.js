$(document).ready(function () {
	$('#modalolvidoclave').modal();
	$('#modalfirmacontraseña').modal({
		dismissible: false
	});
	$('#modalfirma').modal();
	$('#modalAsesorias').modal();
	$('#modalOActividades').modal();
	$('#modalObservaciones').modal();
	$('textarea#observaciones_dd').characterCounter();
	$('input#codigo_asignatura').characterCounter();
	$('textarea#observaciones').characterCounter();
	$(".close").on("click", function () {
		$('.contenido-alert').hide();
	});
});


