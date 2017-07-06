$(document).ready(function () {
	$('#modalolvidoclave').modal();
});

$(document).ready(function () {
	$('#modalfirmacontraseña').modal({
		dismissible: false
	});
});

$(document).ready(function () {
	$('#modalfirma').modal();
});

$(document).ready(function () {
	$('textarea#observaciones_dd').characterCounter();
	$('input#codigo_asignatura').characterCounter();
	$('textarea#observaciones').characterCounter();
});

$(document).ready(function () {
	$(".close").on("click", function () {
		$('.contenido-alert').hide();
	});
});
