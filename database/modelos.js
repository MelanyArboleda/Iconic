var Sequelize = require('sequelize');
var sequelize = require('./config');
//sequelize.authenticate() validar si se conecto a la bd

// Modelos de las tablas de la base de datos
var tbl_estados = sequelize.define('tbl_estados', { 
  estado:  {
    type :Sequelize.STRING(15),
    allowNull: false,
    unique: true
  }
}, {
  freezeTableName: true
});

var tbl_dedicaciones = sequelize.define('tbl_dedicaciones', { 
  dedicacion:  {
    type :Sequelize.STRING(20),
    allowNull: false,
    unique: true
  }
}, {
  freezeTableName: true
});

var tbl_perfiles = sequelize.define('tbl_perfiles', { 
  perfil:  {
    type :Sequelize.STRING(50),
    allowNull: false,
    unique: true
  }
}, {
  freezeTableName: true
});

var tbl_recursos = sequelize.define('tbl_recursos', { 
  recurso:  {
    type :Sequelize.STRING(50),
    allowNull: false,
    unique: true
  }
}, {
  freezeTableName: true
});

// var tbl_ingresos = sequelize.define('tbl_ingresos', { 
//   tblRecursoId: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     allowNull: false
//   },
//   tblPerfileId: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     allowNull: false
//   },
//   ver:  {
//     type :Sequelize.BOOLEAN,
//     allowNull: false
//   }
// }, {
//   freezeTableName: true
// });

// tbl_recursos.hasMany(tbl_ingresos);
// tbl_ingresos.belongsTo(tbl_recursos);
// tbl_perfiles.hasMany(tbl_ingresos);
// tbl_ingresos.belongsTo(tbl_perfiles);

var tbl_tareas = sequelize.define('tbl_tareas', { 
  tarea:  {
    type :Sequelize.STRING(30),
    allowNull: false,
    unique: true
  }
}, {
  freezeTableName: true
});

// var tbl_ediciones = sequelize.define('tbl_ediciones', {
//   tblIngresoId: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     allowNull: false
//   },
//   tblTareaId: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     allowNull: false
//   }, 
//   activar:  {
//     type :Sequelize.BOOLEAN,
//     allowNull: false,
//     unique: true
//   }
// }, {
//   freezeTableName: true
// });

// tbl_ingresos.hasMany(tbl_ediciones);
// tbl_ediciones.belongsTo(tbl_ingresos);
// tbl_tareas.hasMany(tbl_ediciones);
// tbl_ediciones.belongsTo(tbl_tareas);

var tbl_facultades = sequelize.define('tbl_facultades', { 
  facultad:  {
    type :Sequelize.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
  freezeTableName: true
});

var tbl_areas = sequelize.define('tbl_areas', { 
  area:  {
    type :Sequelize.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
  freezeTableName: true
});

tbl_facultades.hasMany(tbl_areas);
tbl_areas.belongsTo(tbl_facultades);

var tbl_programas = sequelize.define('tbl_programas', { 
  codigo: {
    type :Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
  programas:  {
    type :Sequelize.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
  freezeTableName: true
});

tbl_areas.hasMany(tbl_programas);
tbl_programas.belongsTo(tbl_areas);

var tbl_usuarios = sequelize.define('tbl_usuarios', {
  doc_identidad: {
    type: Sequelize.STRING(15),
    allowNull: false,
    unique: true
  },
  nombre: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  apellido_1: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  apellido_2: {
    type: Sequelize.STRING(50),
  },
  correo: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true
  },
  contraseña: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  tblEstadoId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  tblPerfileId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true
});

tbl_estados.hasMany(tbl_usuarios);
tbl_dedicaciones.hasMany(tbl_usuarios);
tbl_perfiles.hasMany(tbl_usuarios);
tbl_facultades.hasMany(tbl_usuarios);
//tbl_areas.hasMany(tbl_usuarios);
//tbl_programas.hasMany(tbl_usuarios);
tbl_usuarios.belongsTo(tbl_estados);
tbl_usuarios.belongsTo(tbl_dedicaciones);
tbl_usuarios.belongsTo(tbl_perfiles);
tbl_usuarios.belongsTo(tbl_facultades);
//tbl_usuarios.belongsTo(tbl_areas);
//tbl_usuarios.belongsTo(tbl_programas);

var tbl_recuperaciones = sequelize.define('tbl_recuperaciones',{
  tblUsuarioId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
  recuperar: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

tbl_usuarios.hasMany(tbl_recuperaciones);
tbl_recuperaciones.belongsTo(tbl_usuarios);

module.exports = {
                  tbl_estados:tbl_estados,
                  tbl_dedicaciones:tbl_dedicaciones,
                  tbl_perfiles:tbl_perfiles,
                  tbl_recursos:tbl_recursos,
                  //tbl_ingresos:tbl_ingresos,
                  tbl_tareas:tbl_tareas,
                  //tbl_ediciones:tbl_ediciones,
                  tbl_facultades:tbl_facultades,
                  tbl_areas:tbl_areas,
                  tbl_programas:tbl_programas,
                  tbl_usuarios:tbl_usuarios,
                  tbl_recuperaciones:tbl_recuperaciones,
                };