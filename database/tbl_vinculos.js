var Sequelize = require('sequelize');
var sequelize = require('./config');

var tbl_vinculos = sequelize.define('tbl_vinculos', {
    vinculo: {
      type: Sequelize.STRING(25),
      allowNull: false
    }
  });

module.exports = tbl_vinculos;