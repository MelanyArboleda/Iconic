$(document).ready(function () {
	$('textarea#observaciones_dd').characterCounter();
	$('input#codigo_asignatura').characterCounter();
	$('textarea#observaciones').characterCounter();
	$(".close").on("click", function () {
		$('.contenido-alert').hide();
	});
});


