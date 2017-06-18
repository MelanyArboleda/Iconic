var crud = require('.././services/crudService');
var modelo = require('.././database/modelos');
var mail = require('.././services/mailService')
let fs = require('fs');
var path = require('path');

const codigoVerificacionPath = path.join(__dirname, '..', 'public', 'codigo.html');
const codigoVerificacionHtml = (fs.readFileSync(codigoVerificacionPath)).toString();
const linkRecuperarPath = path.join(__dirname, '..', 'public', 'correo.html');
const linkRecuperarHtml = (fs.readFileSync(linkRecuperarPath)).toString();
module.exports = {

    restablecer: function (req, res) {
        var dato = [{
            correo: req.body.email
        }];
        crud.findAll(modelo.tbl_usuarios, dato, function (data) {
            //si data trae informacion es por que encontro alguna coinsidencia
            if (data !== undefined) {
                //si el usuario no se activo no se podra recuperar la contraseña
                if (data.tblEstadoId == 1 && data.contraseña != '123') {
                    //se saca alguna informacion del usuario
                    var doc_identidad = data.doc_identidad.toString();
                    var nombre = data.nombre;

                    //se encripta el doc_identidad
                    for (var i = 0; i < 4; i++) {
                        var b = new Buffer(doc_identidad);
                        var doc_identidad = b.toString('base64');
                    }

                    //se construlle una url con la fecha y el usuario
                    var date = new Date();
                    var fecha = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
                    var dateEnt = new Buffer(fecha);
                    fecha = dateEnt.toString('base64');
                    var asunto = 'restablecer contraseña';
                    var html = linkRecuperarHtml;
                    html = html.replace("url", "http://localhost:3000/#!/recu/" + doc_identidad + "/" + fecha);
                    html = html.replace("Usuario", "" + nombre);

                    var resp = mail(req.body.email, asunto, html);
                    if (resp = true) {
                        var datos = {
                            recuperar: true
                        };
                        var donde = {
                            doc_identidad: data.doc_identidad
                        }
                        //se busca y crea o actualiza el campo recuperar del usuario
                        modelo.tbl_usuarios.sync().then(function () {
                            crud.findOrCreate(modelo.tbl_usuarios, datos, donde, function (data) {
                                if (!data) {
                                    crud.update(modelo.tbl_usuarios, donde, datos, function (data) { });
                                }
                            });
                        });
                    }
                    return res.redirect('/');
                } else {
                    console.log('el usuario esta inactivo o no a actualizado su contraseña inicial');
                    return res.redirect('/');
                }
            } else {
                console.log('no se encontro el correo');
                return res.redirect('/');
            }
        });
    },

    codigo: function (correo, nombre) {

        var random = new Array('mayus', 'minus', 'numeros', 'mayus', 'minus');
        var muyus = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
        var minus = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
        var codigo = "";
        for (i = 0; i < 6; i++) {
            var j = random[Math.floor(Math.random() * random.length)];
            if (j == "numeros") {
                codigo += "" + Math.floor(Math.random() * 10);
            } else if (j == "minus") {
                codigo += minus[Math.floor(Math.random() * minus.length)];
            } else {
                codigo += muyus[Math.floor(Math.random() * muyus.length)];
            }
        }
        var html = codigoVerificacionHtml;
        html = html.replace("codigo", codigo);
        html = html.replace("Usuario", nombre);
        var resp = mail(correo, "Código de Activación", html);
        return codigo;
    }
};        