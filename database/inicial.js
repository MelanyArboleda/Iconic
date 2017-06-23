var funciones = require('.././services/funciones');
var modelo = require('.././database/modelos');
var crud = require('.././services/crudService');

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
  { id: 3, perfil: "Vecerrector" },
  { id: 4, perfil: "Coordinador de programa" },
  { id: 5, perfil: "Coordinación de investigación" },
  { id: 6, perfil: "Coordinación de extensión" },
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

var permisos_iniciales = [];

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
  tblPerfileId: 6,
  tblEstadoId: 1,
  recuperar: false
},
{
  doc_identidad: "1152710692",
  nombre: "Samuel Andrés",
  apellido_1: "Vergara",
  apellido_2: "Bedoya",
  correo: "samuel_vergara23151@elpoli.edu.co",
  contraseña: funciones.encriptar("Iconic123"),
  contraseña_firma: funciones.encriptar("0"),
  tblPerfileId: 6,
  tblEstadoId: 3,
  recuperar: false
}];

var usuario_doc = [{
  doc_identidad: "1039470240"
},
{
  doc_identidad: "1152710692"
}];

var usuario_programa = [{
  tblUsuarioDocIdentidad: "1039470240",
  tblProgramaCodigo: "6",
  tblProgramaPrograma: "Ingeniería",
  tblProgramaSede: 1
},
{
  tblUsuarioDocIdentidad: "1152710692",
  tblProgramaCodigo: "6",
  tblProgramaPrograma: "Ingeniería",
  tblProgramaSede: 1
}];

var vinculos = [
  { id: 1, vinculo: "Director" },
  { id: 2, vinculo: "Miembro" },
  { id: 3, vinculo: "Investigador Principal" },
  { id: 4, vinculo: "Co-investigador" }];

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
  año: '2017/06/10',
  fecha_inicial: '2017/06/10',
  fecha_final: '2017/06/30'
},{
  tblEtapaId: 1,
  tblFacultadeId: 6,
  semestre: 2,
  año: '2016/06/10',
  fecha_inicial: '2016/06/10',
  fecha_final: '2016/06/30'
},];

var dias = [
  { id: 1, dia: "Domingo" },
  { id: 2, dia: "Lunes" },
  { id: 3, dia: "Martes" },
  { id: 4, dia: "Miercoles" },
  { id: 5, dia: "Jueves" },
  { id: 6, dia: "Viernes" },
  { id: 7, dia: "Sabado" },];


//llamados de insercion para cada tabla
llamado_insert(estados, modelo.tbl_estados, estados, () => {
  llamado_insert(dedicaciones, modelo.tbl_dedicaciones, dedicaciones, () => {
    llamado_insert(perfiles, modelo.tbl_perfiles, perfiles, () => {
      llamado_insert(recursos, modelo.tbl_recursos, recursos, () => {
        // llamado_insert(permisos_iniciales, modelo.tbl_permisos_iniciales, permisos_iniciales, () => {
        llamado_insert(facultades, modelo.tbl_facultades, facultades, () => {
          llamado_insert(areas, modelo.tbl_areas, areas, () => {
            llamado_insert(sedes, modelo.tbl_sedes, sedes, () => {
              llamado_insert(programas, modelo.tbl_programas, programas, () => {
                llamado_insert(usuarios, modelo.tbl_usuarios, usuario_doc, () => {
                  llamado_insert(usuario_programa, modelo.tbl_usuario_programa, usuario_programa, () => {
                    llamado_insert(vinculos, modelo.tbl_vinculos, vinculos, () => {
                      llamado_insert(actores, modelo.tbl_actores, actores, () => {
                        llamado_insert(etapas, modelo.tbl_etapas, etapas, () => {
                          llamado_insert(fechas_etapas, modelo.tbl_fechas_etapas, fechas_etapas, () => {
                            llamado_insert(dias, modelo.tbl_dias, dias, () => {
                              
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
      crud.findOrCreate(tabla, datos[i], donde[i], function (argument) { });
    }
    callback()
  });
};