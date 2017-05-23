var encriptar = require('.././controllers/Encriptar_password');
var modelo = require('.././database/modelos');
var admon = require('.././database/admon');

//vectores con los datos a insertar
var estados = [{
  id: 1,
  estado: "Activo"
}, {
  id: 2,
  estado: "Inactivo"
}];
var donde_estados = [{id: 1}, {id: 2}];
llamado_insert(estados,modelo.tbl_estados,donde_estados);

// var dedicaciones = [{
//  dedicacion: "Tiempo Completo"
// }, {
//  dedicacion: "Medio Tiempo"
// }, {
//  dedicacion: "Ocacional TC"
// }];
// var donde_dedicaciones = [{id: 1}, {id: 2}, {id: 3}];
// llamado_insert(dedicaciones,modelo.tbl_dedicaciones,donde_dedicaciones);

// var perfiles = [{
//   perfil: "Docente"
// },{
//   perfil: "Decano"
// },{
//   perfil: "Vecerrector"
// },{
//   perfil: "Coordinador de programa"
// },{
//   perfil: "Coordinación de investigación"
// },{
//   perfil: "Coordinación de extensión"
// },{
//   perfil: "Administrador"
// }];
// var donde_perfiles = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}];
// llamado_insert(perfiles,modelo.tbl_perfiles,donde_perfiles);

// var recursos = [{
//   recurso: "Información general"
// },{
//   recurso: "Docencia directa"
// },{
//   recurso: "Investigaciones"
// },{
//   recurso: "Extensión y proyección"
// },{
//   recurso: "Comision de estudios"
// },{
//   recurso: "Proyectos y publicaciones"
// },{
//   recurso: "Asesorías en proyectos"
// },{
//   recurso: "Otras actividades"
// },{
//   recurso: "Observaciones"
// },{
//   recurso: "Seguimiento"
// },{
//   recurso: "Evaluación"
// },{
//   recurso: "Observaciones decano"
// },{
//   recurso: "Administración de fechas"
// },{
//   recurso: "Permisos"
// },{
//   recurso: "Generar reportes"
// },{
//   recurso: "ver reportes"
// }];
// var donde_recursos = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}, {id: 11}, {id: 12}, {id: 13}, {id: 14}, {id: 15}, {id: 16}];
// llamado_insert(recursos,modelo.tbl_recursos,donde_recursos);

// var tareas = [{
//   tarea: "Consultar"
// },{
//   tarea: "Guardar"
// },{
//   tarea: "Modificar"
// },{
//   tarea: "Eliminar"
// },{
//   tarea: "Firmar"
// },{
//   tarea: "Asignar"
// },{
//   tarea: "Remover"
// }];
// var donde_tareas = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}];
// llamado_insert(tareas,modelo.tbl_tareas,donde_tareas);

// var facultades = [{
//   facultad: "Administración"
// },{
//   facultad: "Ciencias Agrarias"
// },{
//   facultad: "Ciencias Básicas, Sociales y Humanas"
// },{
//   facultad: "Comunicación Audiovisual"
// },{
//   facultad: "Educación Física"
// },{
//   facultad: "Recreación y Deporte"
// },{
//   facultad: "Ingeniería"
// }];
// var donde_facultades = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}];
// llamado_insert(facultades,modelo.tbl_facultades,donde_facultades);

// var usuarios = [{
//   doc_identidad: "1039470240",
//   nombre: "Gabriel",
//   apellido_1: "Arboleda",
//   correo: "gabriel_arboleda23151@elpoli.edu.co",
//   contraseña: encriptar("123"),
//   tblEstadoId: 1,
//   tblPerfileId: 7
// }];
// var donde_usuarios = [{id: 1}];
// llamado_insert(usuarios,modelo.tbl_usuarios,donde_usuarios);

//funcion que llama el metodo insertar
function llamado_insert(datos,tabla,donde) {
  for (var i = 0; i < datos.length; i++) {
    admon.findOrCreate(tabla, datos[i],donde[i],function (data) {});
  }
}