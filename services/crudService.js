var Sequelize = require('sequelize');
var sequelize = require('../database/config');
module.exports = {
  //Busqueda e inserto
  findOrCreate: function (tabla, dato, donde, callback) {
    tabla.findOrCreate({
      where: donde,
      defaults: dato
    }).spread((tabla, created) => {
      console.log(tabla.get({
        plain: true
      }))
      console.log(created);
      callback(tabla.dataValues, created);
    });
  },
  //buscar todo
  findAll: function (tabla, donde, order, callback) {
    tabla.findAll({
      where: donde,
      order: order
    }).then((tabla) => {
      callback(tabla);
    }).catch((err) => {
      console.log(err);
      callback();
    });
  },

  create: function (tabla, dato, callback) {
    tabla.create(dato).then((res) => {
      callback(res.dataValues)
    }).catch((e) => {
      console.log("Error" + e);
      callback('error')
    });
  },
  //modificar espesifico
  update: function (tabla, donde, dato, callback) {
    tabla.update(dato, { where: donde }).then(() => {
      callback('update')
    }).catch((e) => {
      console.log("Error" + e);
      callback('error')
    });
  },
  //inner join facultad
  innerFacultad: function (tabla, donde, callback) {
    tabla[0].findAll({
      attributes: ['id', 'facultad'],
      include: [{
        model: tabla[1], required: true, attributes: [],
        include: [{
          model: tabla[2], required: true, attributes: [], where: donde
        }]
      }]
    }).then((tabla) => {
      callback(tabla[0].dataValues);
    }).catch((err) => {
      console.log(err);
      callback();
    });
  },
  //buscar el uno
  findOne: function (tabla, donde, order, callback) {
    tabla.findOne({
      where: donde,
      order: order
    }).then((tabla) => {
      callback(tabla.dataValues);
    }).catch((err) => {
      console.log(err);
      callback();
    });
  },
  //inner join area
  innerArea : function (tabla, donde, callback) {
    tabla[0].findAll({
      attributes: ['area'],
      include: [{
        model: tabla[1], required: true, attributes: [],where: donde
      }]
    }).then((tabla) => {
      callback(tabla[0].dataValues);
    }).catch((err) => {
      console.log(err);
      callback();
    });
  },

  innerDedicacion : function (tabla, donde, callback) {
    tabla[0].findAll({
      attributes: ['dedicacion'],
      include: [{
        model: tabla[1], required: true, attributes: [],where: donde
      }]
    }).then((tabla) => {
      callback(tabla[0].dataValues);
    }).catch((err) => {
      console.log(err);
      callback();
    });
  },
}