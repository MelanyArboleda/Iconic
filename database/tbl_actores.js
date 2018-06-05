var Sequelize = require('sequelize');
var sequelize = require('./config');

// modelo de los actorores
var tbl_actores = sequelize.define('tbl_actores', {
    actor: {
        type: Sequelize.STRING(20)
    }
});

module.exports = tbl_actores;