const funciones = require('.././services/funciones');
const crud = require('.././services/crudService');
const tbl_usuarios = require('.././database/tbl_usuarios');
const tbl_usuario_programas = require('.././database/tbl_usuario_programas');
const tbl_facultades = require('.././database/tbl_facultades');
const tbl_areas = require('.././database/tbl_areas');
const tbl_programas = require('.././database/tbl_programas');
const tbl_estados = require('.././database/tbl_estados');
const tbl_perfiles = require('.././database/tbl_perfiles');
const tbl_permisos = require('.././database/tbl_permisos');
const tbl_recursos = require('.././database/tbl_recursos');
const path = require('path');
const jwt = require("jwt-simple");
const config = require("../config/config");
const bcrypt = require('bcryptjs');
const mail = require('./MailController');
module.exports = {
    //genera el login
    login: (req, res, next) => {
        if (req.body.correo && req.body.password) {
            var correo = req.body.correo;
            var password = req.body.password;
            crud.findOne(tbl_usuarios, { correo: correo }, null, (user) => {
                if (!user) {
                    res.sendStatus(403);
                } else if (user.tblEstadoId != '2' /*|| user.createdAt.toString() == user.updatedAt.toString()*/) {
                    if (bcrypt.compareSync(password, user.contraseña)) {
                        var payload = {
                            correo: user.correo
                        };
                        user = {
                            doc_identidad: user.doc_identidad,
                            nombre: user.nombre,
                            apellido_1: user.apellido_1,
                            apellido_2: user.apellido_2,
                            correo: user.correo,
                            dedicacion: user.tblDedicacioneId,
                            perfil: user.tblPerfileId,
                            estado: user.tblEstadoId,
                            created: user.createdAt,
                            updated: user.updatedAt
                        };
                        var token = jwt.encode(payload, config.secret);
                        res.json({
                            token: token,
                            user: user
                        });
                    } else {
                        res.sendStatus(401);
                    }
                } else {
                    res.status(401).json({ estado: 2 }).end();
                }
            });


        } else {
            res.sendStatus(401);
        }
    },
    //busca el usuario para saber si esta logeado
    buscar_User: function (req, res, next) {
        var decode = jwt.decode(req.body.token, config.secret);
        crud.findOne(tbl_usuarios, { correo: decode.correo }, null, (user) => {
            user = {
                doc_identidad: user.doc_identidad,
                nombre: user.nombre,
                apellido_1: user.apellido_1,
                apellido_2: user.apellido_2,
                correo: user.correo,
                dedicacion: user.tblDedicacioneId,
                perfil: user.tblPerfileId,
                estado: user.tblEstadoId
            };
            res.status(200).json({ user: user }).end();
        });
    },
    //enviar codigo de verficacion de dos paso del login
    send_Code: (req, res, next) => {
        const user = req.body;
        var codigo = mail.codigo(user.correo, user.nombre);
        if (codigo != "") {
            var b = new Buffer(codigo);
            codigo = b.toString('base64');
            res.json(codigo);
        } else {
            res.sendStatus(401);
        }

    },
    //valida el codigo enviado para la activacion de la cuenta
    validar_Code: function (req, res, next) {
        var codigoEncriptado = new Buffer(req.body.codigoEncriptado, 'base64');
        codigoEncriptado = codigoEncriptado.toString();
        if (req.body.codigo == codigoEncriptado) {
            res.status(200).end();
        } else {
            res.sendStatus(401);
        }
    },
    //cambia el estado del cliente
    cambiar_Estado: function (req, res, next) {
        crud.update(tbl_usuarios, { doc_identidad: req.body.doc_identidad }, { tblEstadoId: req.body.tblEstadoId }, function (data) {
            if (data == 'update') {
                funciones.buscarUser(req.body.doc_identidad, function (user) {
                    res.status(200).json({ user: user }).end();
                });
            };
        });
    },
    //validar datos de restablecer
    validar_datos: function (req, res, next) {
        //desencripto la fecha
        var fecha = new Buffer(req.body.fecha, 'base64');
        fecha = fecha.toString();
        //obtengo la fecha actual del sistema
        var date = new Date();
        var fecha_act = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
        //desencripto la id del usuario
        var user = new Buffer(req.body.id, 'base64')
        user = user.toString();
        //busco si el usuario existe en el sistema
        crud.findOne(tbl_usuarios, { doc_identidad: user }, null, function (data) {
            if (data !== undefined) {
                if (data.tblEstadoId == 1) {
                    //si existe valido la fechas
                    if (fecha >= fecha_act) {
                        //si no he restablecido la contraseña 
                        if (data.recuperar == true) {
                            //me deja ingresar a restablecer
                            res.status(200).json({ id: user }).end();
                        } else {
                            //no me deja restablecer
                            res.sendStatus(403);
                        }
                    } else {
                        //se paso del tiempo limite de restablecer
                        crud.update(tbl_usuarios, { doc_identidad: user }, { recuperar: false }, function (data) {
                            res.sendStatus(403);
                        });
                    }
                } else {
                    //cuanta inactiva
                    res.sendStatus(403);
                }
            }
        });
    },
    //valida la nueva contraseña
    validar_password: function (req, res, next) {
        //consulto el usuario
        crud.findOne(tbl_usuarios, { doc_identidad: req.body.doc_identidad }, null, (user) => {
            //comparo si la contraseña es la misma a la que tenia
            if (!bcrypt.compareSync(req.body.password, user.contraseña) && req.body.password != "Iconic123") {
                //si es diferente actualizo la contraseña
                crud.update(tbl_usuarios, { doc_identidad: req.body.doc_identidad }, { contraseña: funciones.encriptar(req.body.password), tblEstadoId: 1, recuperar: false }, function (data) {
                    if (data == 'update') {
                        funciones.buscarUser(req.body.doc_identidad, function (user) {
                            res.status(200).json({ user: user, mensaje: 'contraseña actualizada' }).end();
                        });
                    }
                });
            } else {
                //si es la misma no lo dejo actualizarla
                res.sendStatus(401);
            }
        });
    },

    guardar_Firma: function (req, res, next) {
        var fs = require('fs'), base64Data, binaryData;
        if (!fs.existsSync('./firmas')) {
            fs.mkdir('./firmas', (err) => {
                if (err) { res.sendStatus(401); }
            });
        }
        base64Data = req.body.firma.replace(/^data:image\/formato;base64,/, "");
        base64Data += base64Data.replace('+', ' ');
        binaryData = new Buffer(base64Data, 'base64').toString('binary');

        fs.writeFile('./firmas/firma_' + req.body.doc_identidad + '.jpg', binaryData, "binary", (err) => {
            if (err) {
                res.sendStatus(401);
            } else {
                var firma = "./firmas/firma_" + req.body.doc_identidad + ".jpg"
                crud.update(tbl_usuarios, { doc_identidad: req.body.doc_identidad }, { firma: firma }, function (data) {
                     if (data == 'update') {
                         res.status(200).end();
                     } else {
                         res.status(401).end();
                     }
                 });
            };
        });

        
    },

    cinicial: function (req, res, next) {
        if (req.res.req.user.contraseña != req.body.contraseña_firma) {
            crud.update(tbl_usuarios, { doc_identidad: req.res.req.user.doc_identidad }, { contraseña_firma: funciones.encriptar(req.body.contraseña_firma) }, function (data) {
                if (data == 'update') {
                    return true
                } else {
                    return false
                }
            });
        } else {
            return 'contraseñaigual';
        }

    },

    buscar_Usuarios: function (req, res, next) {
        crud.innerUser([tbl_usuarios, tbl_usuario_programas, tbl_programas, tbl_areas, tbl_facultades], req.body, (users) => {
            res.status(200).json({ users: users }).end();
        })
    },

    buscar_Estados: function (req, res, next) {
        crud.findAll(tbl_estados, null, null, (estados) => {
            res.status(200).json({ estados: estados }).end();
        })
    },

    buscar_Perfiles: function (req, res, next) {
        crud.findAll(tbl_perfiles, null, null, (perfiles) => {
            res.status(200).json({ perfiles: perfiles }).end();
        })
    },

    modificar_Usuario: function (req, res, next) {
        tbl_usuarios.sync().then(function () {
            crud.update(tbl_usuarios, { doc_identidad: req.body.donde }, req.body.datos, (resp) => {
                if (resp == 'update') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    modificar_Permiso: function (req, res, next) {
        tbl_permisos.sync().then(function () {
            crud.update(tbl_permisos, { tblRecursoId: req.body.tblRecursoId, tblUsuarioDocIdentidad: req.body.tblUsuarioDocIdentidad }, req.body, (resp) => {
                if (resp == 'update') {
                    res.status(200).end();
                } else {
                    res.sendStatus(403);
                }
            });
        });
    },

    buscar_Recursos: function (req, res, next) {
        tbl_recursos.sync().then(function () {
            crud.findAll(tbl_recursos, null, null, (recursos) => {
                res.status(200).json({ recursos: recursos }).end();
            })
        });
    }
};