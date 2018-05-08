var funciones = require('.././services/funciones');
var crud = require('.././services/crudService');
var tbl_estados = require('./tbl_estados');
var tbl_dedicaciones = require('./tbl_dedicaciones');
var tbl_perfiles = require('./tbl_perfiles');
var tbl_recursos = require('./tbl_recursos');
var tbl_facultades = require('./tbl_facultades');
var tbl_areas = require('./tbl_areas');
var tbl_sedes = require('./tbl_sedes');
var tbl_programas = require('./tbl_programas');
var tbl_usuarios = require('./tbl_usuarios');
var tbl_usuario_programas = require('./tbl_usuario_programas');
var tbl_vinculos = require('./tbl_vinculos');
var tbl_actores = require('./tbl_actores');
var tbl_etapas = require('./tbl_etapas');
var tbl_fechas_etapas = require('./tbl_fechas_etapas');
var tbl_permisos_iniciales = require('./tbl_permisos_iniciales');
var tbl_permisos = require('./tbl_permisos');

//vectores de objetos con los datos a insertar una ves se inicie el servidor
var estados = [
    { id: 1, estado: "Activo" },
    { id: 2, estado: "Inactivo" },
    { id: 3, estado: "Espera" },
    { id: 4, estado: "contraseña" }];

var dedicaciones = [
    { id: 1, dedicacion: "Tiempo Completo" },
    { id: 2, dedicacion: "Medio Tiempo" },
    { id: 3, dedicacion: "Ocacional TC" },
    { id: 4, dedicacion: "Ocacional MT" }];

var perfiles = [
    { id: 1, perfil: "Docente" },
    { id: 2, perfil: "Decano" },
    { id: 3, perfil: "Vicerrector de docencia" },
    { id: 4, perfil: "Coordinador de programa" },
    { id: 5, perfil: "Coordinación de investigación" },
    { id: 6, perfil: "Vicerectoria de extensión" },
    { id: 7, perfil: "Administrador" }];

var recursos = [
    { id: 1, recurso: "Docencia directa" },
    { id: 2, recurso: "Investigaciones" },
    { id: 3, recurso: "Extensión y proyección" },
    { id: 4, recurso: "Comision de estudios" },
    { id: 5, recurso: "Proyectos y publicaciones" },
    { id: 6, recurso: "Asesorías en proyectos" },
    { id: 7, recurso: "Otras actividades" },
    { id: 8, recurso: "Observaciones" },
    { id: 9, recurso: "Seguimiento" },
    { id: 10, recurso: "Evaluación" },
    { id: 11, recurso: "Administración de fechas" },
    { id: 12, recurso: "Permisos" },
    { id: 13, recurso: "reportes" },
    { id: 14, recurso: "consertar" },
    { id: 15, recurso: "usuarios" },
    { id: 16, recurso: "firmar" }];

var permisos_iniciales = [
    { tblRecursoId: 1, tblPerfileId: 1, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 2, tblPerfileId: 1, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 3, tblPerfileId: 1, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 4, tblPerfileId: 1, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 5, tblPerfileId: 1, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 6, tblPerfileId: 1, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 7, tblPerfileId: 1, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 8, tblPerfileId: 1, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 9, tblPerfileId: 1, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 10, tblPerfileId: 1, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 11, tblPerfileId: 1, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 12, tblPerfileId: 1, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 13, tblPerfileId: 1, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 14, tblPerfileId: 1, ver: true, crear: true, modificar: false, eliminar: false },
    { tblRecursoId: 15, tblPerfileId: 1, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 16, tblPerfileId: 1, ver: true, crear: true, modificar: true, eliminar: false },

    { tblRecursoId: 1, tblPerfileId: 2, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 2, tblPerfileId: 2, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 3, tblPerfileId: 2, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 4, tblPerfileId: 2, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 5, tblPerfileId: 2, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 6, tblPerfileId: 2, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 7, tblPerfileId: 2, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 8, tblPerfileId: 2, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 9, tblPerfileId: 2, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 10, tblPerfileId: 2, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 11, tblPerfileId: 2, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 12, tblPerfileId: 2, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 13, tblPerfileId: 2, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 14, tblPerfileId: 2, ver: true, crear: true, modificar: false, eliminar: false },
    { tblRecursoId: 15, tblPerfileId: 2, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 16, tblPerfileId: 2, ver: true, crear: true, modificar: true, eliminar: false },

    { tblRecursoId: 1, tblPerfileId: 3, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 2, tblPerfileId: 3, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 3, tblPerfileId: 3, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 4, tblPerfileId: 3, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 5, tblPerfileId: 3, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 6, tblPerfileId: 3, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 7, tblPerfileId: 3, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 8, tblPerfileId: 3, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 9, tblPerfileId: 3, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 10, tblPerfileId: 3, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 11, tblPerfileId: 3, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 12, tblPerfileId: 3, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 13, tblPerfileId: 3, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 14, tblPerfileId: 3, ver: true, crear: true, modificar: false, eliminar: false },
    { tblRecursoId: 15, tblPerfileId: 3, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 16, tblPerfileId: 3, ver: true, crear: false, modificar: false, eliminar: false },

    { tblRecursoId: 1, tblPerfileId: 4, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 2, tblPerfileId: 4, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 3, tblPerfileId: 4, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 4, tblPerfileId: 4, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 5, tblPerfileId: 4, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 6, tblPerfileId: 4, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 7, tblPerfileId: 4, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 8, tblPerfileId: 4, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 9, tblPerfileId: 4, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 10, tblPerfileId: 4, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 11, tblPerfileId: 4, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 12, tblPerfileId: 4, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 13, tblPerfileId: 4, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 14, tblPerfileId: 4, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 15, tblPerfileId: 4, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 16, tblPerfileId: 4, ver: true, crear: true, modificar: true, eliminar: false },

    { tblRecursoId: 1, tblPerfileId: 5, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 2, tblPerfileId: 5, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 3, tblPerfileId: 5, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 4, tblPerfileId: 5, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 5, tblPerfileId: 5, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 6, tblPerfileId: 5, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 7, tblPerfileId: 5, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 8, tblPerfileId: 5, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 9, tblPerfileId: 5, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 10, tblPerfileId: 5, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 11, tblPerfileId: 5, ver: false, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 12, tblPerfileId: 5, ver: false, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 13, tblPerfileId: 5, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 14, tblPerfileId: 5, ver: false, crear: true, modificar: false, eliminar: false },
    { tblRecursoId: 15, tblPerfileId: 5, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 16, tblPerfileId: 5, ver: false, crear: false, modificar: false, eliminar: false },

    { tblRecursoId: 1, tblPerfileId: 6, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 2, tblPerfileId: 6, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 3, tblPerfileId: 6, ver: true, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 4, tblPerfileId: 6, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 5, tblPerfileId: 6, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 6, tblPerfileId: 6, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 7, tblPerfileId: 6, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 8, tblPerfileId: 6, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 9, tblPerfileId: 6, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 10, tblPerfileId: 6, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 11, tblPerfileId: 6, ver: false, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 12, tblPerfileId: 6, ver: false, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 13, tblPerfileId: 6, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 14, tblPerfileId: 6, ver: false, crear: true, modificar: false, eliminar: false },
    { tblRecursoId: 15, tblPerfileId: 6, ver: false, crear: false, modificar: false, eliminar: false },
    { tblRecursoId: 16, tblPerfileId: 6, ver: false, crear: false, modificar: false, eliminar: false },

    { tblRecursoId: 1, tblPerfileId: 7, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 2, tblPerfileId: 7, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 3, tblPerfileId: 7, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 4, tblPerfileId: 7, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 5, tblPerfileId: 7, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 6, tblPerfileId: 7, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 7, tblPerfileId: 7, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 8, tblPerfileId: 7, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 9, tblPerfileId: 7, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 10, tblPerfileId: 7, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 11, tblPerfileId: 7, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 12, tblPerfileId: 7, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 13, tblPerfileId: 7, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 14, tblPerfileId: 7, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 15, tblPerfileId: 7, ver: true, crear: true, modificar: true, eliminar: true },
    { tblRecursoId: 16, tblPerfileId: 7, ver: true, crear: true, modificar: true, eliminar: true }
];

var vinculos = [
    { id: 1, vinculo: "Director" },
    { id: 2, vinculo: "Miembro" },
    { id: 3, vinculo: "Investigador Principal" },
    { id: 4, vinculo: "Co-Investigador" }];

var actores = [
    { id: 1, actor: "Principal" },
    { id: 2, actor: "Co-Autor" }];

var etapas = [
    { id: 1, etapa: "Presentación" },
    { id: 2, etapa: "Concertación" },
    { id: 3, etapa: "Aprobación" },
    { id: 4, etapa: "Seguimiento" },
    { id: 5, etapa: "Evaluación" }];

var usuarios = [
    { doc_identidad: "3725428427", nombre: "Administrador", apellido_1: "Administrador", apellido_2: "Administrador", correo: "tolosa-321@hotmail.com", contraseña: funciones.encriptar("Iconic123"), contraseña_firma: funciones.encriptar("0"), tblDedicacioneId: 1, tblPerfileId: 7, tblEstadoId: 1, recuperar: false },
    { doc_identidad: "1039470240", nombre: "docente", apellido_1: "docente", apellido_2: "docente", correo: "gabriel_arboleda23151@elpoli.edu.co", contraseña: funciones.encriptar("Iconic123"), contraseña_firma: funciones.encriptar("0"), tblDedicacioneId: 1, tblPerfileId: 1, tblEstadoId: 1, recuperar: false },
    { doc_identidad: "1152710692", nombre: "Decano", apellido_1: "Decano", apellido_2: "Decano", correo: "gabotolosa97@gmail.com", contraseña: funciones.encriptar("Iconic123"), contraseña_firma: funciones.encriptar("0"), tblDedicacioneId: 1, tblPerfileId: 2, tblEstadoId: 1, recuperar: false },
    { doc_identidad: "1234567890", nombre: "Docencia", apellido_1: "Docencia", apellido_2: "Docencia", correo: "melany1@gmail.com", contraseña: funciones.encriptar("Iconic123"), contraseña_firma: funciones.encriptar("0"), tblDedicacioneId: 1, tblPerfileId: 3, tblEstadoId: 3, recuperar: false },
    { doc_identidad: "9876543210", nombre: "Programa", apellido_1: "Programa", apellido_2: "Programa", correo: "programa@gmail.com", contraseña: funciones.encriptar("Iconic123"), contraseña_firma: funciones.encriptar("0"), tblDedicacioneId: 1, tblPerfileId: 4, tblEstadoId: 3, recuperar: false },
    { doc_identidad: "1324758690", nombre: "Investigación", apellido_1: "Investigación", apellido_2: "Investigación", correo: "investigacion@gmail.com", contraseña: funciones.encriptar("Iconic123"), contraseña_firma: funciones.encriptar("0"), tblDedicacioneId: 1, tblPerfileId: 5, tblEstadoId: 3, recuperar: false },
    { doc_identidad: "9786543210", nombre: "Extensión", apellido_1: "Extensión", apellido_2: "Extensión", correo: "extensión@elpoli.edu.co", contraseña: funciones.encriptar("Iconic123"), contraseña_firma: funciones.encriptar("0"), tblDedicacioneId: 1, tblPerfileId: 6, tblEstadoId: 3, recuperar: false }
];

var usuario_doc = [
    { doc_identidad: "3725428427" },
    { doc_identidad: "1039470240" },
    { doc_identidad: "1152710692" },
    { doc_identidad: "1234567890" },
    { doc_identidad: "9876543210" },
    { doc_identidad: "1324758690" },
    { doc_identidad: "9786543210" }
];

function llenarPermisos(callback) {
    var permisosAdmin = [];
    crud.findAll(tbl_permisos_iniciales, { tblPerfileId: 7 }, null, (iniciales) => {
        for (j = 0; j < iniciales.length; j++) {
            permisosAdmin.push({ tblRecursoId: iniciales[j].tblRecursoId, tblUsuarioDocIdentidad: "3725428427", ver: iniciales[j].ver, crear: iniciales[j].crear, modificar: iniciales[j].modificar, eliminar: iniciales[j].eliminar });
            if (j === iniciales.length - 1) {
                callback(permisosAdmin);
            }
        }
    });
}

var usuario_programas = [
    { tblUsuarioDocIdentidad: "1039470240", tblProgramaCodigo: "23", tblProgramaPrograma: "TÉCNICO PROF. EN PROG. DE SISTEMAS DE INFORMACIÓN (CICLO PRO. CON TSD)", tblProgramaSede: 1 },
    { tblUsuarioDocIdentidad: "1152710692", tblProgramaCodigo: "A6", tblProgramaPrograma: "FACULTAD DE INGENIERIAS", tblProgramaSede: 1 },
    { tblUsuarioDocIdentidad: "1234567890", tblProgramaCodigo: "A6", tblProgramaPrograma: "FACULTAD DE INGENIERIAS", tblProgramaSede: 1 },
    { tblUsuarioDocIdentidad: "9876543210", tblProgramaCodigo: "23", tblProgramaPrograma: "TÉCNICO PROF. EN PROG. DE SISTEMAS DE INFORMACIÓN (CICLO PRO. CON TSD)", tblProgramaSede: 1 },
    { tblUsuarioDocIdentidad: "1324758690", tblProgramaCodigo: "A6", tblProgramaPrograma: "FACULTAD DE INGENIERIAS", tblProgramaSede: 1 },
    { tblUsuarioDocIdentidad: "9786543210", tblProgramaCodigo: "A6", tblProgramaPrograma: "FACULTAD DE INGENIERIAS", tblProgramaSede: 1 },
    { tblUsuarioDocIdentidad: "3725428427", tblProgramaCodigo: "A6", tblProgramaPrograma: "FACULTAD DE INGENIERIAS", tblProgramaSede: 1 }
];

//llamados de insercion para cada tabla
llamado_insert(estados, tbl_estados, estados, () => {
    llamado_insert(dedicaciones, tbl_dedicaciones, dedicaciones, () => {
        llamado_insert(perfiles, tbl_perfiles, perfiles, () => {
            llamado_insert(recursos, tbl_recursos, recursos, () => {
                llamado_insert(permisos_iniciales, tbl_permisos_iniciales, permisos_iniciales, () => {
                    llamado_insert(usuarios, tbl_usuarios, usuario_doc, () => {
                        llamado_insert(usuario_programas, tbl_usuario_programas, usuario_programas, () => {
                            llenarPermisos((permisosAdmin) => {
                                llamado_insert(permisosAdmin, tbl_permisos, permisosAdmin, () => {
                                    llamado_insert(vinculos, tbl_vinculos.tbl_vinculos, vinculos, () => {
                                        llamado_insert(actores, tbl_actores, actores, () => {
                                            llamado_insert(etapas, tbl_etapas, etapas, () => {
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

//funcion que llama el metodo insertar
function llamado_insert(datos, tabla, donde, callback) {
    tabla.sync().then(function () {
        for (var i = 0; i < datos.length; i++) {
            crud.findOrCreate(tabla, datos[i], donde[i], null, function (argument) { });
        }
        callback()
    });
};