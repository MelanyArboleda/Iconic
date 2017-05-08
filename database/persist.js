var postgresql = require('pg').Pool;
var config = require('.././database/config');
var pool = new postgresql(config);

module.exports = {

	insert	: function (req, res, next) {
		
	},

	update	: function (req, res, next) {

	},

	delete	: function (req, res, next) {

	},

	execute	: function (req, res, next) {

	},

	save	: function (req, res, next) {

	},

	select	: function (req, res, next) {

	},

	selectList	: function (req, res, next) {

	},

}