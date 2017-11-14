const crud = require('.././services/crudService');
const tbl_usuarios = require('.././database/tbl_usuarios');
const mail = require('.././services/mailService')
let fs = require('fs');
const path = require('path');

const codigoVerificacionPath = path.join(__dirname, '..', 'public', 'codigo.html');
const codigoVerificacionHtml = (fs.readFileSync(codigoVerificacionPath)).toString();
const linkRecuperarPath = path.join(__dirname, '..', 'public', 'correo.html');
const linkRecuperarHtml = (fs.readFileSync(linkRecuperarPath)).toString();
module.exports = {

    sendLink: function (req, res, next) {
        var dato = {
            correo: req.body.correo
        };
        crud.findAll(tbl_usuarios, dato, null, function (data) {
            //si data trae informacion es por que encontro alguna coinsidencia
            if (data !== undefined) {
                //si el usuario no se activo no se podra recuperar la contraseña
                if (data[0].dataValues.tblEstadoId == 1 && data[0].dataValues.recuperar == false) {
                    //se saca alguna informacion del usuario
                    var doc_identidad = data[0].dataValues.doc_identidad.toString();
                    var nombre = data[0].dataValues.nombre;
                    //se encripta el doc_identidad
                    var b = new Buffer(doc_identidad);
                    var doc_identidad = b.toString('base64');

                    //se construlle una url con la fecha y el usuario
                    var date = new Date();
                    var fecha = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
                    var dateEnt = new Buffer(fecha);
                    fecha = dateEnt.toString('base64');
                    var asunto = 'restablecer contraseña';
                    var html = linkRecuperarHtml;
                    html = html.replace("url", "http://192.168.1.12:3000/#!/restablecer/" + doc_identidad + "/" + fecha);
                    html = html.replace("Usuario", "" + nombre);

                    var resp = mail(req.body.correo, asunto, html);
                    if (resp = true) {
                        //se actualiza el campo recuperar del usuario
                        tbl_usuarios.sync().then(function () {
                            crud.update(tbl_usuarios, { doc_identidad: data[0].dataValues.doc_identidad }, { recuperar: true }, function (data) {
                                //se envio el mensaje con el link
                                res.status(200).end();
                            });
                        });
                    } else {
                        //retornar errror de que no se envio
                        res.sendStatus(403);
                    }
                } else {
                    if (data[0].dataValues.tblEstadoId == 2) {
                        //mensaje de que la cuenta esta inactiva
                        res.sendStatus(403);
                    } else {
                        if (data[0].dataValues.tblEstadoId == 3 || data[0].dataValues.tblEstadoId == 4) {
                            //mensaje de que no a activado la cuenta con el codigo
                            res.sendStatus(403);
                        } else{
                            //ya se habia enviado un correo con el link
                            res.sendStatus(400);
                        }
                    }
                }
            } else {
                res.sendStatus(404);
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