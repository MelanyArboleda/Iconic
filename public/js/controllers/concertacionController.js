angular.module("iconic").controller("concertacionCtrl", concertacionCtrl);
var socket = io.connect('http://192.168.1.19:3000', { 'forceNew': true });
concertacionCtrl.$inject = ["loginService", "loginFactory", "ptdService", "ptdFactory", "serviceNotification", "$q", "$scope"];

function concertacionCtrl(loginService, loginFactory, ptdService, ptdFactory, serviceNotification, $q, $scope) {
    var vm = this;
    vm.loginFactory = loginFactory;
    vm.enviar = enviar;
    vm.mensaje = "";

    socket.on('messages', function (data) {
        loginFactory.isLogin().then(function () {
            render(data);
        });
    });

    function render(data) {
        var html = data.map(function (elem, index) {
            if (elem.tblUsuarioDocIdentidad == loginFactory.user.nombre + " " + loginFactory.user.apellido_1 + " " + loginFactory.user.apellido_2) {
                var clase = "mensaje-autor"
            } else {
                var clase = "mensaje-amigo"
            }
            return (`<div class="${clase}">
                            <div class="contenido">
                                <strong>${elem.tblUsuarioDocIdentidad}</strong></br>
                                <p class="message">${elem.mensaje}</p>
                                <div class="fecha">
                                    <p>Enviado ${elem.fecha}</p>
                                </div>
                            </div>
                        </div>`)
        }).join(" ");

        document.getElementById('mensajes').innerHTML = html;
    }

    function enviar() {
        var fecha = $scope.date = new Date();
        var hora = fecha.getHours()
        var minuto = fecha.getMinutes()
        var meridiano = "AM";
        var dia = fecha.getDate();
        var mes = fecha.getMonth();
        var año = fecha.getFullYear();
        if (fecha.getHours() > 12) { hora -= 12; meridiano = "PM" }
        if (hora < 10) { hora = "0" + hora }
        if (minuto < 10) { minuto = "0" + minuto }
        var concertacion = {
            tblUsuarioDocIdentidad: loginFactory.user.doc_identidad,
            tblPtdId: ptdFactory.ptd.id,
            mensaje: vm.mensaje,
            fecha: fecha
        }
        ptdService.guardarConcertacion({ concertacion: concertacion }).then(function (resp) {
            concertacion_new = {
                tblUsuarioDocIdentidad: resp.user,
                tblPtdId: resp.concertacion.tblPtdId,
                mensaje: resp.concertacion.mensaje,
                fecha: hora + ":" + minuto + " " + meridiano + " - " + dia + "/" + mes + "/" + año
            }
            vm.mensaje = "";
            socket.emit('new-message', concertacion_new);
        }).catch(function (err) {
            serviceNotification.error('No se pudo enviar el mensaje.', 2000);
        });
    }
}