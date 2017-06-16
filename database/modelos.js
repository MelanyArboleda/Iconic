var Sequelize = require('sequelize');
var sequelize = require('./config');
//sequelize.authenticate() validar si se conecto a la bd

// Modelos de las tablas de la base de datos
var tbl_estados = sequelize.define('tbl_estados', {
  estado: {
    type: Sequelize.STRING(15),
    allowNull: false,
    unique: true
  }
}, {
    freezeTableName: true
  });

var tbl_dedicaciones = sequelize.define('tbl_dedicaciones', {
  dedicacion: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true
  }
}, {
    freezeTableName: true
  });

var tbl_perfiles = sequelize.define('tbl_perfiles', {
  perfil: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true
  }
}, {
    freezeTableName: true
  });

var tbl_recursos = sequelize.define('tbl_recursos', {
  recurso: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true
  }
}, {
    freezeTableName: true
  });

var tbl_permisos_iniciales = sequelize.define('tbl_permisos_iniciales', {
  tblRecursoId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  tblPerfileId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  consultar: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  guardar: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  modificar: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
}, {
    freezeTableName: true
  });

tbl_recursos.hasMany(tbl_permisos_iniciales);
tbl_permisos_iniciales.belongsTo(tbl_recursos);
tbl_perfiles.hasMany(tbl_permisos_iniciales);
tbl_permisos_iniciales.belongsTo(tbl_perfiles);

var tbl_facultades = sequelize.define('tbl_facultades', {
  facultad: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
    freezeTableName: true
  });

var tbl_areas = sequelize.define('tbl_areas', {
  area: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true
  },
  tblFacultadeId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
    freezeTableName: true
  });

tbl_facultades.hasMany(tbl_areas);
tbl_areas.belongsTo(tbl_facultades);

var tbl_sedes = sequelize.define('tbl_sedes', {
  sede: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true
  }
}, {
    freezeTableName: true
  });

var tbl_programas = sequelize.define('tbl_programas', {
  codigo: {
    type: Sequelize.STRING(10),
    primaryKey: true,
    allowNull: false
  },
  tblSedeId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  programa: {
    type: Sequelize.STRING(100),
    primaryKey: true,
    allowNull: false
  },
  tblAreaId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
    freezeTableName: true
  });

tbl_areas.hasMany(tbl_programas);
tbl_programas.belongsTo(tbl_areas);
tbl_sedes.hasMany(tbl_programas);
tbl_programas.belongsTo(tbl_sedes);

var tbl_etapas = sequelize.define('tbl_etapas', {
  etapa: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true
  }
}, {
    freezeTableName: true
  });

var tbl_fechas_etapas = sequelize.define('tbl_fechas_etapas', {
  tblEtapaId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  tblFacultadeId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  semestre: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  año: {
    type: Sequelize.DATE,
    allowNull: false
  },
  fecha_inicial: {
    type: Sequelize.DATE,
    allowNull: false
  },
  fecha_final: {
    type: Sequelize.DATE,
    allowNull: false
  },

}, {
    freezeTableName: true
  });

tbl_etapas.hasMany(tbl_fechas_etapas);
tbl_fechas_etapas.belongsTo(tbl_etapas);
tbl_facultades.hasMany(tbl_fechas_etapas);
tbl_fechas_etapas.belongsTo(tbl_facultades);

var tbl_usuarios = sequelize.define('tbl_usuarios', {
  doc_identidad: {
    type: Sequelize.STRING(15),
    primaryKey: true,
    allowNull: false
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
    type: Sequelize.STRING(250),
    allowNull: false
  },
  contraseña_firma: {
    type: Sequelize.STRING(250),
    allowNull: false
  },
  tblDedicacioneId: {
    type: Sequelize.INTEGER
  },
  firma: {
    type: Sequelize.BLOB,
    //allowNull: false
  },
  tblPerfileId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  tblEstadoId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  recuperar: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
}, {
    freezeTableName: true
  });

tbl_estados.hasMany(tbl_usuarios);
tbl_usuarios.belongsTo(tbl_estados);
tbl_dedicaciones.hasMany(tbl_usuarios);
tbl_usuarios.belongsTo(tbl_dedicaciones);
tbl_perfiles.hasMany(tbl_usuarios);
tbl_usuarios.belongsTo(tbl_perfiles);

var tbl_notificaciones = sequelize.define('tbl_notificaciones', {
  mensaje: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tblUsuarioDoc_identidad: {
    type: Sequelize.STRING(15),
    allowNull: false
  },
  fecha: {
    type: Sequelize.DATE,
    allowNull: false
  },
  visto: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
}, {
    freezeTableName: true
  });

tbl_usuarios.hasMany(tbl_notificaciones);
tbl_notificaciones.belongsTo(tbl_usuarios);

var tbl_usuario_programa = sequelize.define('tbl_usuario_programa', {
  tblUsuarioDoc_identidad: {
    type: Sequelize.STRING(15),
    primaryKey: true,
    allowNull: false
  },
  tblProgramaCodigo: {
    type: Sequelize.STRING(10),
    primaryKey: true,
    allowNull: false
  },
  tblProgramaPrograma: {
    type: Sequelize.STRING(100),
    primaryKey: true,
    allowNull: false
  }
}, {
    freezeTableName: true
  });

tbl_usuarios.hasMany(tbl_usuario_programa);
tbl_usuario_programa.belongsTo(tbl_usuarios);
tbl_programas.hasMany(tbl_usuario_programa);
tbl_usuario_programa.belongsTo(tbl_programas);

var tbl_permisos = sequelize.define('tbl_permisos', {
  tblRecursoId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  tblUsuarioDoc_identidad: {
    type: Sequelize.STRING(15),
    primaryKey: true,
    allowNull: false
  },
  consultar: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  guardar: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  modificar: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
}, {
    freezeTableName: true
  });

tbl_recursos.hasMany(tbl_permisos);
tbl_permisos.belongsTo(tbl_recursos);
tbl_usuarios.hasMany(tbl_permisos);
tbl_permisos.belongsTo(tbl_usuarios);

var tbl_ptd = sequelize.define('tbl_ptd', {
  tblUsuarioDoc_identidad: {
    type: Sequelize.STRING(15),
    allowNull: false
  },
  fecha: {
    type: Sequelize.DATE,
    allowNull: false
  },
  semestre: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  version: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  observaciones_dd: {
    type: Sequelize.STRING
  },
  horas_semanales: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

tbl_usuarios.hasMany(tbl_ptd);
tbl_ptd.belongsTo(tbl_usuarios);

var tbl_dodencias_directas = sequelize.define('tbl_dodencias_directas', {
  nombre_asignatura: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  codigo_asignatura: {
    type: Sequelize.STRING(15),
    allowNull: false
  },
  grupo_asignatura: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  numero_estudiantes: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  horas_semanales: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  estudiante: {
    type: Sequelize.INTEGER
  },
  jefe: {
    type: Sequelize.INTEGER
  },
  tblPtdId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  observacion_ptd: {
    type: Sequelize.STRING
  }
});

tbl_ptd.hasMany(tbl_dodencias_directas);
tbl_dodencias_directas.belongsTo(tbl_ptd);

var tbl_vinculos = sequelize.define('tbl_vinculos', {
  vinculo: {
    type: Sequelize.STRING(25),
    allowNull: false
  }
});

var tbl_invertigaciones_proyectos = sequelize.define('tbl_invertigaciones_proyectos', {
  nombre_proyecto: {
    type: Sequelize.STRING(500),
    allowNull: false
  },
  tblVinculoId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  objetivo_principal: {
    type: Sequelize.STRING,
    allowNull: false
  },
  producto: {
    type: Sequelize.STRING,
    allowNull: false
  },
  horas_semanales: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  aprobado: {
    type: Sequelize.BOOLEAN
  },
  tblPtdId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  observacion_ptd: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

tbl_ptd.hasMany(tbl_invertigaciones_proyectos);
tbl_invertigaciones_proyectos.belongsTo(tbl_ptd);
tbl_vinculos.hasMany(tbl_invertigaciones_proyectos);
tbl_invertigaciones_proyectos.belongsTo(tbl_vinculos);

var tbl_invertigaciones_semilleros = sequelize.define('tbl_invertigaciones_semilleros', {
  nombre_semillero: {
    type: Sequelize.STRING(500),
    allowNull: false
  },
  tblVinculoId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  actividad_desarrollada: {
    type: Sequelize.STRING,
    allowNull: false
  },
  producto: {
    type: Sequelize.STRING,
    allowNull: false
  },
  horas_semanales: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  aprobado: {
    type: Sequelize.BOOLEAN
  },
  tblPtdId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

tbl_ptd.hasMany(tbl_invertigaciones_semilleros);
tbl_invertigaciones_semilleros.belongsTo(tbl_ptd);
tbl_vinculos.hasMany(tbl_invertigaciones_semilleros);
tbl_invertigaciones_semilleros.belongsTo(tbl_vinculos);

var tbl_actividades_extension = sequelize.define('tbl_actividades_extension', {
  nombre_actividad: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  fecha_inicio: {
    type: Sequelize.DATE,
    allowNull: false
  },
  fecha_final: {
    type: Sequelize.DATE,
    allowNull: false
  },
  horas_semestrales: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  aprobado: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  tblPtdId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  observacion_ptd: {
    type: Sequelize.STRING
  },
});

tbl_ptd.hasMany(tbl_actividades_extension);
tbl_actividades_extension.belongsTo(tbl_ptd);

var tbl_comision_estudios = sequelize.define('tbl_comision_estudios', {
  universidad: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tipo_estudio: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nombre_estudio: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fecha_inicio: {
    type: Sequelize.DATE,
    allowNull: false
  },
  fecha_graduacion: {
    type: Sequelize.DATE,
    allowNull: false
  },
  fecha_obtencion_autorizacion: {
    type: Sequelize.DATE,
    allowNull: false
  },
  aportes_inst_obtenidos: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tblPtdId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  observacion_ptd: {
    type: Sequelize.STRING
  }
});

tbl_ptd.hasMany(tbl_comision_estudios);
tbl_comision_estudios.belongsTo(tbl_ptd);

var tbl_actores = sequelize.define('tbl_actores', {
  actor: {
    type: Sequelize.STRING(20)
  }
});

var tbl_formulacion_proyectos = sequelize.define('tbl_formulacion_proyectos', {
  nombre_articulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tblActoreId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  tema_ppal: {
    type: Sequelize.STRING,
    allowNull: false
  },
  horas_semestrales: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  tblPtdId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  observacion_ptd: {
    type: Sequelize.STRING
  }
});

tbl_ptd.hasMany(tbl_formulacion_proyectos);
tbl_formulacion_proyectos.belongsTo(tbl_ptd);
tbl_actores.hasMany(tbl_formulacion_proyectos);
tbl_formulacion_proyectos.belongsTo(tbl_actores);

var tbl_asesoria_proyectos = sequelize.define('tbl_asesoria_proyectos', {
  integrantes: {
    type: Sequelize.STRING,
    allowNull: false
  },
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  aspectos: {
    type: Sequelize.STRING,
    allowNull: false
  },
  horas_semestrales: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  estudiante: {
    type: Sequelize.INTEGER
  },
  jefe: {
    type: Sequelize.INTEGER
  },
  tblPtdId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  observacion_ptd: {
    type: Sequelize.STRING
  }
});

tbl_ptd.hasMany(tbl_asesoria_proyectos);
tbl_asesoria_proyectos.belongsTo(tbl_ptd);

var tbl_resumen = sequelize.define('tbl_resumen', {
  horas_semanales_tot: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  observaciones: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tblPtdId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  observacion_ptd: {
    type: Sequelize.STRING
  }
});

tbl_ptd.hasMany(tbl_resumen);
tbl_resumen.belongsTo(tbl_ptd);

var tbl_actividades = sequelize.define('tbl_actividades', {
  nombre_actividad: {
    type: Sequelize.STRING,
    allowNull: false
  },
  horas_semanales: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  descripcion_productos: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tblResumenId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

tbl_resumen.hasMany(tbl_actividades);
tbl_actividades.belongsTo(tbl_resumen);

var tbl_observaciones = sequelize.define('tbl_observaciones', {
  observacion: {
    type: Sequelize.STRING,
    allowNull: false
  },
  firma_consejo_facultad: {
    type: Sequelize.BLOB,
    allowNull: false
  },
  firma_coord_prog: {
    type: Sequelize.BLOB,
    allowNull: false
  },
  firma_docente: {
    type: Sequelize.BLOB,
    allowNull: false
  },
  tblPtdId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  observacion_ptd: {
    type: Sequelize.STRING
  }
});

tbl_ptd.hasMany(tbl_observaciones);
tbl_observaciones.belongsTo(tbl_ptd);

var tbl_dias = sequelize.define('tbl_dias', {
  dia: {
    type: Sequelize.STRING(15),
    allowNull: false,
    unique: true
  }
});

var tbl_horarios = sequelize.define('tbl_horarios', {
  tblDiaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  hora_inicio: {
    type: Sequelize.DATE,
    allowNull: false
  },
  hora_fin: {
    type: Sequelize.DATE,
    allowNull: false
  },
  tblObservacioneId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

tbl_observaciones.hasMany(tbl_horarios);
tbl_horarios.belongsTo(tbl_observaciones);
tbl_dias.hasMany(tbl_horarios);
tbl_horarios.belongsTo(tbl_dias);

var tbl_seguimientos_evaluacion = sequelize.define('tbl_seguimientos_evaluacion', {
  semana: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  descripcion: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fecha: {
    type: Sequelize.DATE,
    allowNull: false
  },
  firma_coord_prog: {
    type: Sequelize.BLOB,
    allowNull: false
  },
  firma_docente: {
    type: Sequelize.BLOB,
    allowNull: false
  },
  tblPtdId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

tbl_ptd.hasMany(tbl_seguimientos_evaluacion);
tbl_seguimientos_evaluacion.belongsTo(tbl_ptd);

var tbl_evidencias = sequelize.define('tbl_evidencias', {
  evidencia: {
    type: Sequelize.BLOB
  },
  tblSeguimientos_evaluacionId: {
    type: Sequelize.INTEGER
  }
});

tbl_seguimientos_evaluacion.hasMany(tbl_evidencias);
tbl_evidencias.belongsTo(tbl_seguimientos_evaluacion);

module.exports = {
  tbl_estados: tbl_estados,
  tbl_dedicaciones: tbl_dedicaciones,
  tbl_perfiles: tbl_perfiles,
  tbl_recursos: tbl_recursos,
  tbl_permisos_iniciales: tbl_permisos_iniciales,
  tbl_permisos: tbl_permisos,
  tbl_facultades: tbl_facultades,
  tbl_areas: tbl_areas,
  tbl_programas: tbl_programas,
  tbl_sedes: tbl_sedes,
  tbl_fechas_etapas: tbl_fechas_etapas,
  tbl_etapas: tbl_etapas,
  tbl_usuarios: tbl_usuarios,
  tbl_notificaciones: tbl_notificaciones,
  tbl_usuario_programa: tbl_usuario_programa,
  tbl_ptd: tbl_ptd,
  tbl_dodencias_directas: tbl_dodencias_directas,
  tbl_invertigaciones_proyectos: tbl_invertigaciones_proyectos,
  tbl_invertigaciones_semilleros: tbl_invertigaciones_semilleros,
  tbl_vinculos: tbl_vinculos,
  tbl_actividades_extension: tbl_actividades_extension,
  tbl_comision_estudios: tbl_comision_estudios,
  tbl_actores: tbl_actores,
  tbl_formulacion_proyectos: tbl_formulacion_proyectos,
  tbl_asesoria_proyectos: tbl_asesoria_proyectos,
  tbl_resumen: tbl_resumen,
  tbl_actividades: tbl_actividades,
  tbl_observaciones: tbl_observaciones,
  tbl_dias: tbl_dias,
  tbl_horarios: tbl_horarios,
  tbl_seguimientos_evaluacion: tbl_seguimientos_evaluacion,
  tbl_evidencias: tbl_evidencias
};