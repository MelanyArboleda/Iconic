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
var tbl_materias = require('./tbl_materias');
var tbl_materias_programas = require('./tbl_materias_programas');
const moment = require('moment');

//vectores de objetos con los datos a insertar una ves se inicie el servidor
var estados = [
    { id: 1, estado: "Activo" },
    { id: 2, estado: "Inactivo" },
    { id: 3, estado: "Espera" },
    { id: 4, estado: "contraseña" }];

var dedicaciones = [
    { id: 1, dedicacion: "Tiempo Completo" },
    { id: 2, dedicacion: "Medio Tiempo" },
    { id: 3, dedicacion: "Ocacional TC" }];

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
    { id: 11, recurso: "Observaciones decano" },
    { id: 12, recurso: "Administración de fechas" },
    { id: 13, recurso: "Permisos" },
    { id: 14, recurso: "Generar reportes" },
    { id: 15, recurso: "ver reportes" }];

var permisos_iniciales = [
    { tblRecursoId: 1, tblPerfileId: 1, ver: true, crear: true, modificar: true, eliminar: true}];

var facultades = [
    { id: 1, facultad: "Administración" },
    { id: 2, facultad: "Ciencias Agrarias" },
    { id: 3, facultad: "Ciencias Básicas, Sociales y Humanas" },
    { id: 4, facultad: "Comunicación Audiovisual" },
    { id: 5, facultad: "Educación Física, Recreación y Deporte" },
    { id: 6, facultad: "Ingeniería" }];

var areas = [
    { id: 1, area: "Ciencias Agrarias", tblFacultadeId: 2 },
    { id: 2, area: "Ciencias Básicas, Sociales y Humanas", tblFacultadeId: 3 },
    { id: 3, area: "Comunicación Audiovisual", tblFacultadeId: 4 },
    { id: 4, area: "Educación Física, Recreación y Deporte", tblFacultadeId: 5 },
    { id: 5, area: "Seguridad de Higiene y Ocupacional", tblFacultadeId: 6 },
    { id: 6, area: "Instrumentación y Control", tblFacultadeId: 6 },
    { id: 7, area: "Área civil", tblFacultadeId: 6 },
    { id: 8, area: "Informática y Telecomunicaciones", tblFacultadeId: 6 },
    { id: 9, area: "Administración", tblFacultadeId: 1 },
    { id: 10, area: "Ingeniería", tblFacultadeId: 6 }];

var sedes = [
    { id: 1, sede: "Medellin" },
    { id: 2, sede: "Apartadó" },
    { id: 3, sede: "Rionegro" }];

var programas = [
    { codigo: "101952", tblSedeId: 1, programa: "Tecnología en Gestión Aeroportuaria", tblAreaId: 9 },
    { codigo: "1749", tblSedeId: 1, programa: "Tecnología en Costos y Auditoría", tblAreaId: 9 },
    { codigo: "103305", tblSedeId: 3, programa: "Tecnología en Gestión Industrial", tblAreaId: 9 },
    { codigo: "52236", tblSedeId: 2, programa: "Tecnología en Gestión Pública", tblAreaId: 9 },
    { codigo: "101886", tblSedeId: 1, programa: "Tecnología en Gestión Pública", tblAreaId: 9 },
    { codigo: "103880", tblSedeId: 1, programa: "Tecnología en Gestión de Empresas y Destinos Turísticos", tblAreaId: 9 },
    { codigo: "103065", tblSedeId: 2, programa: "Tecnología en Logística Integral", tblAreaId: 9 },
    { codigo: "90490", tblSedeId: 1, programa: "Tecnología en Logística", tblAreaId: 9 },
    { codigo: "1755", tblSedeId: 1, programa: "Tecnología Industrial", tblAreaId: 9 },
    { codigo: "2540", tblSedeId: 1, programa: "Contaduría Pública", tblAreaId: 9 },
    { codigo: "2540", tblSedeId: 3, programa: "Contaduría Pública", tblAreaId: 9 },
    { codigo: "2937", tblSedeId: 1, programa: "Ingeniería de Productividad y Calidad", tblAreaId: 9 },
    { codigo: "103464", tblSedeId: 1, programa: "Gerencia Financiera", tblAreaId: 9 },
    { codigo: "9567", tblSedeId: 1, programa: "Gerencia Integral", tblAreaId: 9 },
    { codigo: "54963", tblSedeId: 1, programa: "Finanzas Públicas", tblAreaId: 9 },
    { codigo: "2859", tblSedeId: 1, programa: "Tecnólogo Agropecuario", tblAreaId: 1 },
    { codigo: "4206", tblSedeId: 1, programa: "Administración de Empresas Agropecuarias", tblAreaId: 1 },
    { codigo: "5243", tblSedeId: 1, programa: "Ingeniería Agropecuaria", tblAreaId: 1 },
    { codigo: "91323", tblSedeId: 1, programa: "Maestría en Gestión de la Producción Animal", tblAreaId: 1 },
    { codigo: "102621", tblSedeId: 1, programa: "Tecnólogo en Química Industrial y de Laboratorio", tblAreaId: 2 },
    { codigo: "21549", tblSedeId: 1, programa: "Tecnología en Organización de Eventos", tblAreaId: 3 },
    { codigo: "3983", tblSedeId: 1, programa: "Tecnología en Producción de Televisión", tblAreaId: 3 },
    { codigo: "55167", tblSedeId: 1, programa: "Comunicación Audiovisual", tblAreaId: 3 },
    { codigo: "53460", tblSedeId: 1, programa: "Maestría en Comunicación Educativa", tblAreaId: 3 },
    { codigo: "54149", tblSedeId: 1, programa: "Técnica Profesional en Masoterapia", tblAreaId: 4 },
    { codigo: "91271", tblSedeId: 2, programa: "Tecnología en Entrenamiento Deportivo", tblAreaId: 4 },
    { codigo: "91270", tblSedeId: 3, programa: "Tecnología en Entrenamiento Deportivo", tblAreaId: 4 },
    { codigo: "3801", tblSedeId: 1, programa: "Licenciatura en Educación Básica con Énfasis en Educación Física, Recreación y Deportes", tblAreaId: 4 },
    { codigo: "3729", tblSedeId: 1, programa: "Profesional en Deporte", tblAreaId: 4 },
    { codigo: "103249", tblSedeId: 1, programa: "Maestría en Fisiología del Ejercicio", tblAreaId: 4 },
    { codigo: "53588", tblSedeId: 1, programa: "Técnica Profesional en Programación de Sistemas de Información (por ciclos propedeuticos)", tblAreaId: 8 },
    { codigo: "101624", tblSedeId: 2, programa: "Técnica Profesional en Soporte de Sistemas de Información (por ciclos propedeuticos)", tblAreaId: 8 },
    { codigo: "1751", tblSedeId: 1, programa: "Tecnología en Construcciones Civiles", tblAreaId: 7 },
    { codigo: "105388", tblSedeId: 3, programa: "Tecnología en Construcciones Civiles", tblAreaId: 7 },
    { codigo: "102933", tblSedeId: 1, programa: "Tecnología en Infraestructura de Telecomunicaciones", tblAreaId: 8 },
    { codigo: "1752", tblSedeId: 1, programa: "Tecnología en Instrumentación Industrial", tblAreaId: 6 },
    { codigo: "2714", tblSedeId: 1, programa: "Tecnología en Seguridad e Higiene Ocupacional", tblAreaId: 5 },
    { codigo: "2714", tblSedeId: 3, programa: "Tecnología en Seguridad e Higiene Ocupacional", tblAreaId: 5 },
    { codigo: "101625", tblSedeId: 2, programa: "Tecnología en Sistemas de Información", tblAreaId: 8 },
    { codigo: "53587", tblSedeId: 1, programa: "Tecnología en Sistematización de Datos", tblAreaId: 8 },
    { codigo: "3689", tblSedeId: 1, programa: "Ingeniería Civil", tblAreaId: 7 },
    { codigo: "3347", tblSedeId: 1, programa: "Ingeniería en Higiene y Seguridad Ocupacional", tblAreaId: 5 },
    { codigo: "2541", tblSedeId: 1, programa: "Ingeniería en Instrumentación y Control", tblAreaId: 6 },
    { codigo: "3348", tblSedeId: 1, programa: "Ingeniería Informática", tblAreaId: 8 },
    { codigo: "102595", tblSedeId: 1, programa: "Higiene Ocupacional y Ambiental", tblAreaId: 5 },
    { codigo: "53828", tblSedeId: 1, programa: "Seguridad en el Trabajo", tblAreaId: 5 },
    { codigo: "103871", tblSedeId: 1, programa: "Maestría en Gestión Integral del Riesgo Laboral", tblAreaId: 5 },
    { codigo: "1", tblSedeId: 1, programa: "Administración", tblAreaId: 9 },
    { codigo: "2", tblSedeId: 1, programa: "Ciencias Agrarias", tblAreaId: 1 },
    { codigo: "3", tblSedeId: 1, programa: "Ciencias Básicas, Sociales y Humanas", tblAreaId: 2 },
    { codigo: "4", tblSedeId: 1, programa: "Comunicación Audiovisual", tblAreaId: 3 },
    { codigo: "5", tblSedeId: 1, programa: "Educación Física, Recreación y Deporte", tblAreaId: 4 },
    { codigo: "6", tblSedeId: 1, programa: "Ingeniería", tblAreaId: 10 }];

var usuarios = [{
    doc_identidad: "1039470240",
    nombre: "Gabriel",
    apellido_1: "Arboleda",
    apellido_2: "Tolosa",
    correo: "gabriel_arboleda23151@elpoli.edu.co",
    contraseña: funciones.encriptar("Iconic123"),
    contraseña_firma: funciones.encriptar("0"),
    tblDedicacioneId: 1,
    tblPerfileId: 1,
    tblEstadoId: 1,
    recuperar: false
},
{
    doc_identidad: "1152710692",
    nombre: "Samuel Andrés",
    apellido_1: "Vergara",
    apellido_2: "Bedoya",
    correo: "tolosa-321@hotmail.com",
    contraseña: funciones.encriptar("Iconic123"),
    contraseña_firma: funciones.encriptar("0"),
    tblDedicacioneId: 1,
    tblPerfileId: 2,
    tblEstadoId: 1,
    recuperar: false
},
{
    doc_identidad: "1234567890",
    nombre: "Melany",
    apellido_1: "Arboleda",
    apellido_2: "Camacho",
    correo: "melany@hotmail.com",
    contraseña: funciones.encriptar("Iconic123"),
    contraseña_firma: funciones.encriptar("0"),
    tblDedicacioneId: 1,
    tblPerfileId: 1,
    tblEstadoId: 1,
    recuperar: false
}];

var usuario_doc = [{
    doc_identidad: "1039470240"
}, {
    doc_identidad: "1152710692"
}, {
    doc_identidad: "1234567890"
}];

var usuario_programas = [{
    tblUsuarioDocIdentidad: "1039470240",
    tblProgramaCodigo: "53587",
    tblProgramaPrograma: "Tecnología en Sistematización de Datos",
    tblProgramaSede: 1
},
{
    tblUsuarioDocIdentidad: "1152710692",
    tblProgramaCodigo: "6",
    tblProgramaPrograma: "Ingeniería",
    tblProgramaSede: 1
},
{
    tblUsuarioDocIdentidad: "1234567890",
    tblProgramaCodigo: "6",
    tblProgramaPrograma: "Ingeniería",
    tblProgramaSede: 1
}];

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

var fechas_etapas = [{
    tblEtapaId: 1,
    tblFacultadeId: 6,
    semestre: 1,
    ano: '2017',
    fecha_inicial: moment("'10-06-2017", "MM-DD-YYYY"),
    fecha_final: moment("'10-06-2017", "MM-DD-YYYY")
}, {
    tblEtapaId: 2,
    tblFacultadeId: 6,
    semestre: 1,
    ano: '2017',
    fecha_inicial: moment("'10-06-2017", "MM-DD-YYYY"),
    fecha_final: moment("'10-06-2017", "MM-DD-YYYY")
}, {
    tblEtapaId: 3,
    tblFacultadeId: 6,
    semestre: 1,
    ano: '2017',
    fecha_inicial: moment("'10-06-2017", "MM-DD-YYYY"),
    fecha_final: moment("'10-06-2017", "MM-DD-YYYY")
}, {
    tblEtapaId: 1,
    tblFacultadeId: 6,
    semestre: 1,
    ano: '2016',
    fecha_inicial: moment("'10-06-2016", "MM-DD-YYYY"),
    fecha_final: moment("'10-06-2016", "MM-DD-YYYY")
}, {
    tblEtapaId: 1,
    tblFacultadeId: 6,
    semestre: 2,
    ano: '2017',
    fecha_inicial: moment("'10-06-2017", "MM-DD-YYYY"),
    fecha_final: moment("'10-06-2017", "MM-DD-YYYY")
}, {
    tblEtapaId: 2,
    tblFacultadeId: 6,
    semestre: 1,
    ano: '2016',
    fecha_inicial: moment("'10-06-2016", "MM-DD-YYYY"),
    fecha_final: moment("'10-06-2016", "MM-DD-YYYY")
}];

var materias = [
    { codigo: "ING00812", nombre: "Identificación del Ciclo de Vida del Software", horas_semanales: 3 },
    { codigo: "ING00813", nombre: "Comprensión y respeto del entorno", horas_semanales: 3 },
    { codigo: "ING00814", nombre: "Desarrollo de actitudes ciudadanas", horas_semanales: 3 },
    { codigo: "ING00814", nombre: "Desarrollo de Habilidades Comunicativas y de negociación", horas_semanales: 4 },
    { codigo: "ING00816", nombre: "Desarrollo del pensamiento lógico y matemático 1 (A)", horas_semanales: 4 },
    { codigo: "ING00817", nombre: "Desarrollo del pensamiento analítico y sistémico 1", horas_semanales: 4 },
    { codigo: "ING00824", nombre: "Construcción de informes utilizando herramientas Ofimáticas", horas_semanales: 4 },
    { codigo: "ING00818", nombre: "Desarrollo del pensamiento lógico y matemático 1 (B)", horas_semanales: 4 },
    { codigo: "ING00819", nombre: "Definición de Requerimientos", horas_semanales: 4 },
    { codigo: "ING00820", nombre: "Desarrollo de la cultura física y de la actitud artística y recreativa", horas_semanales: 4 },
    { codigo: "ING00821", nombre: "Construcción de elementos de software 1", horas_semanales: 4 }
];

var materias_programas = [
    { tblMateriaCodigo: "ING00812", tblMateriaNombre: "Identificación del Ciclo de Vida del Software", tblProgramaCodigo: "53588", tblProgramaPrograma: "Técnica Profesional en Programación de Sistemas de Información (por ciclos propedeuticos)", tblProgramaSede: 1 },
    { tblMateriaCodigo: "ING00813", tblMateriaNombre: "Comprensión y respeto del entorno", tblProgramaCodigo: "53588", tblProgramaPrograma: "Técnica Profesional en Programación de Sistemas de Información (por ciclos propedeuticos)", tblProgramaSede: 1 },
    { tblMateriaCodigo: "ING00814", tblMateriaNombre: "Desarrollo de actitudes ciudadanas", tblProgramaCodigo: "53588", tblProgramaPrograma: "Técnica Profesional en Programación de Sistemas de Información (por ciclos propedeuticos)", tblProgramaSede: 1 },
    { tblMateriaCodigo: "ING00814", tblMateriaNombre: "Desarrollo de Habilidades Comunicativas y de negociación", tblProgramaCodigo: "53588", tblProgramaPrograma: "Técnica Profesional en Programación de Sistemas de Información (por ciclos propedeuticos)", tblProgramaSede: 1 },
    { tblMateriaCodigo: "ING00816", tblMateriaNombre: "Desarrollo del pensamiento lógico y matemático 1 (A)", tblProgramaCodigo: "53588", tblProgramaPrograma: "Técnica Profesional en Programación de Sistemas de Información (por ciclos propedeuticos)", tblProgramaSede: 1 },
    { tblMateriaCodigo: "ING00817", tblMateriaNombre: "Desarrollo del pensamiento analítico y sistémico 1", tblProgramaCodigo: "53588", tblProgramaPrograma: "Técnica Profesional en Programación de Sistemas de Información (por ciclos propedeuticos)", tblProgramaSede: 1 },
    { tblMateriaCodigo: "ING00824", tblMateriaNombre: "Construcción de informes utilizando herramientas Ofimáticas", tblProgramaCodigo: "53588", tblProgramaPrograma: "Técnica Profesional en Programación de Sistemas de Información (por ciclos propedeuticos)", tblProgramaSede: 1 },
    { tblMateriaCodigo: "ING00818", tblMateriaNombre: "Desarrollo del pensamiento lógico y matemático 1 (B)", tblProgramaCodigo: "53588", tblProgramaPrograma: "Técnica Profesional en Programación de Sistemas de Información (por ciclos propedeuticos)", tblProgramaSede: 1 },
    { tblMateriaCodigo: "ING00819", tblMateriaNombre: "Definición de Requerimientos", tblProgramaCodigo: "53588", tblProgramaPrograma: "Técnica Profesional en Programación de Sistemas de Información (por ciclos propedeuticos)", tblProgramaSede: 1 },
    { tblMateriaCodigo: "ING00820", tblMateriaNombre: "Desarrollo de la cultura física y de la actitud artística y recreativa", tblProgramaCodigo: "53588", tblProgramaPrograma: "Técnica Profesional en Programación de Sistemas de Información (por ciclos propedeuticos)", tblProgramaSede: 1 },
    { tblMateriaCodigo: "ING00821", tblMateriaNombre: "Construcción de elementos de software 1", tblProgramaCodigo: "53588", tblProgramaPrograma: "Técnica Profesional en Programación de Sistemas de Información (por ciclos propedeuticos)", tblProgramaSede: 1 }
];


//llamados de insercion para cada tabla
llamado_insert(estados, tbl_estados, estados, () => {
    llamado_insert(dedicaciones, tbl_dedicaciones, dedicaciones, () => {
        llamado_insert(perfiles, tbl_perfiles, perfiles, () => {
            llamado_insert(recursos, tbl_recursos, recursos, () => {
                // llamado_insert(permisos_iniciales, tbl_permisos_iniciales, permisos_iniciales, () => {
                llamado_insert(facultades, tbl_facultades, facultades, () => {
                    llamado_insert(areas, tbl_areas, areas, () => {
                        llamado_insert(sedes, tbl_sedes, sedes, () => {
                            llamado_insert(programas, tbl_programas, programas, () => {
                                llamado_insert(usuarios, tbl_usuarios, usuario_doc, () => {
                                    llamado_insert(usuario_programas, tbl_usuario_programas, usuario_programas, () => {
                                        llamado_insert(vinculos, tbl_vinculos.tbl_vinculos, vinculos, () => {
                                            llamado_insert(actores, tbl_actores, actores, () => {
                                                llamado_insert(etapas, tbl_etapas, etapas, () => {
                                                    llamado_insert(fechas_etapas, tbl_fechas_etapas.tbl_fechas_etapas, fechas_etapas, () => {
                                                        llamado_insert(materias, tbl_materias, materias, () => {
                                                            llamado_insert(materias_programas, tbl_materias_programas, materias_programas, () => {

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
                    // });
                });
            });
        });
    });
});

//funcion que llama el metodo insertar
function llamado_insert(datos, tabla, donde, callback) {
    tabla.sync({ force: true }).then(function () {
        for (var i = 0; i < datos.length; i++) {
            crud.findOrCreate(tabla, datos[i], donde[i],null, function (argument) { });
        }
        callback()
    });
};