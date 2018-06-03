angular.module("iconic").controller("concertacionCtrl", concertacionCtrl);
var socket = io.connect('http://192.168.1.55:3000', { 'forceNew': true });
concertacionCtrl.$inject = ["$rootScope", "loginService", "loginFactory", "ptdService", "ptdFactory", "serviceNotification", "$q", "$scope"];

function concertacionCtrl($rootScope, loginService, loginFactory, ptdService, ptdFactory, serviceNotification, $q, $scope) {
    var vm = this;
    vm.loginFactory = loginFactory;
    vm.mensaje = "";

    if ($rootScope.PtdReady == true) {
        socket.emit('change channel', ptdFactory.ptd.id);
    } else {
        $rootScope.$on("PtdReady", function () {
            socket.emit('change channel', ptdFactory.ptd.id);
        });
    }

    socket.on('messages', function (data) {
        render(data);
    });

    function render(data) {
        vm.permisoConsertacion = loginFactory.estatus.permisos.find(function (permiso) {
            return permiso.tblRecursoId == 14;
        });
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

    vm.enviar = function () {
        if(vm.mensaje != ""){
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
                };
                vm.mensaje = "";
                socket.emit('new-message', concertacion_new);
            }).catch(function (err) {
                serviceNotification.error('¡No se pudo enviar el mensaje!', 2000);
            });
        }
    }
}