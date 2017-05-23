module.exports = {
  //Busqueda e inserto
  findOrCreate : function (tabla, dato, donde, callback) {
    tabla.sync({force: true}).then(function () {
      return tabla.findOrCreate({
        where: donde, 
        defaults: dato
      }).spread((tabla, created) => {
        console.log(tabla.get({
          plain: true
        }))
        console.log(created);
        callback(created);
      }); 
    });
  },
  //buscar todo
  findAll : function (tabla, donde, callback) {
    tabla.findAll({
      where:  donde 
    }).then((tabla) => {
      callback(tabla[0].dataValues);
    }).catch((err) => {
      console.log(err);
      callback();
    });
  },
  //modificar espesifico
  update : function (tabla, donde, dato, callback) {
    tabla.update(dato, {where: donde}).then(() => {
      callback('update')
    }).catch((e) => {
      console.log("Error"+e);
      callback()
    });
  }
}