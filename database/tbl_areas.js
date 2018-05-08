const Sequelize = require('sequelize');
const sequelize = require('./config');
const tbl_facultades = require('./tbl_facultades');

// modelo de las areas
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
});

tbl_facultades.hasMany(tbl_areas);
tbl_areas.belongsTo(tbl_facultades);

module.exports = tbl_areas;