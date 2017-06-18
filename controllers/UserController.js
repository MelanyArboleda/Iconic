const encriptar = require('.././controllers/EncriptarController');
const crud = require('.././services/crudService');
const modelo = require('.././database/modelos');
const fs = require('fs');
const jwt = require("jwt-simple");
const config = require("../config/config");
const bcrypt = require('bcryptjs');
const mail = require('./MailController');

var user;
module.exports = {

    login: (req, res, next) => {
        console.log(req.body.correo, req.body.password)
        if (req.body.correo && req.body.password) {
            var correo = req.body.correo;
            var password = req.body.password;

            // var user = users.find(function (u) {
            //   return u.email === email && u.password === password;
            // });

            crud.findAll(modelo.tbl_usuarios, { correo: correo }, (user) => {
                if (user && user.tblEstadoId == '1' || user.createdAt.toString() == user.updatedAt.toString()) {
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
                        };
                        var token = jwt.encode(payload, config.secret);
                        res.json({
                            token: token,
                            user: user
                        });
                    } else {
                        res.sendStatus(401);
                    }
                }
            });


        } else {
            res.sendStatus(401);
        }
    },

    sendVerificationCode: (req, res, next) => {
        const user = req.body;
        var codigo = mail.codigo(user.correo, user.nombre);
        var b = new Buffer(codigo);
        codigo = b.toString('base64');
        res.json(codigo);
    },

    getSingUp: function (req, res, next) {
        if (req.user.codigo != null) {
            if (req.user.codigo == 'passwordNew') {
                return res.render('users/configp', {
                    isAuthenticated: req.isAuthenticated(),
                    user: req.user
                });
            } else {
                return res.render('users/verificacion', {
                    isAuthenticated: req.isAuthenticated(),
                    user: req.user
                });
            }
        } else {
            return res.render('users/singup', {
                isAuthenticated: req.isAuthenticated(),
                user: req.user
            });
        }
    },

    logout: function (req, res, next) {
        req.logout();
        res.redirect('/');
    },

    recup: function (req, res, next) {
        var idin = req.params[0];
        idin = idin.split("/");
        user = idin[0];
        var fecha = new Buffer(idin[1], 'base64');
        fecha = fecha.toString();
        var date = new Date();
        var fecha_act = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
        for (var i = 0; i < 4; i++) {
            b = new Buffer(user, 'base64')
            user = b.toString();
        }
        crud.findAll(modelo.tbl_usuarios, { doc_identidad: user }, function (data) {
            if (data !== undefined) {
                if (fecha >= fecha_act) {
                    if (data.recuperar == true) {
                        res.render('users/recu');
                    } else {
                        res.redirect('/');
                    }
                } else {
                    var datos = {
                        recuperar: false
                    };
                    crud.update(modelo.tbl_usuarios, { doc_identidad: user }, datos, function (data) { });
                    res.redirect('/');
                }
            } else {
                console.log(err);
                res.redirect('/');
            }
        });
    },

    nueva: function (req, res, next) {
        var datos = {
            contraseña: encriptar(req.body.contraseña),
            recuperar: false
        };
        crud.update(modelo.tbl_usuarios, { doc_identidad: user }, datos, function (data) {
            if (data == 'update') {
                res.redirect('/');
            }
        });
    },

    activacion: function (req, res, next) {
        return res.render('users/verificacion', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    },

    cambio: function (req, res, next) {
        var codigoEncriptado = new Buffer(req.body.codigoEncriptado, 'base64');
        codigoEncriptado = codigoEncriptado.toString();
        if (req.body.codigo == codigoEncriptado) {
            crud.update(modelo.tbl_usuarios, { doc_identidad: req.body.doc_identidad }, { tblEstadoId: 1 }, function (data) {
                if (data == 'update') {
                    res.status(200).json({ mensaje: 'usuario activado' }).end();
                }
            });
        } else {
            res.status(401).json({ mensaje: 'Codigo invalido' }).end();
        }
    },

    configuracion: function (req, res, next) {
        return res.render('users/configini', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    },

    pinicial: function (req, res, next) {
        if (req.body.contraseñaNew != '123') {
            crud.update(modelo.tbl_usuarios, { doc_identidad: req.res.req.user.doc_identidad }, { contraseña: encriptar(req.body.contraseñaNew) }, function (data) {
                if (data == 'update') {
                    return true;
                } else {
                    return false;
                }
            });
        } else {
            return 'contraseñaNew';
        }
    },

    firma: function (req, res, next) {
        fs.exists('./firmas', (exists) => {
            if (!exists) {
                fs.mkdir('./firmas', (err) => {
                    if (err) throw err;
                    fs.writeFile('./firmas/message.png', 'Hello Node.js', (err) => {
                        if (err) throw err;
                    });
                });
            }
        });

        crud.update(modelo.tbl_usuarios, { doc_identidad: req.res.req.user.doc_identidad }, { firma: req.body.firma }, function (data) {
            if (data == 'update') {
                return true
            } else {
                return false
            }
        });
    },

    cinicial: function (req, res, next) {
        if (req.res.req.user.contraseña != req.body.contraseña_firma) {
            crud.update(modelo.tbl_usuarios, { doc_identidad: req.res.req.user.doc_identidad }, { contraseña_firma: encriptar(req.body.contraseña_firma) }, function (data) {
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

    test: (req, res, next) => {

        console.log("programs");
        crud.findAll(modelo.tbl_programas, {}, (programs) => {
            res.json(programs);
        })
    }
}; 