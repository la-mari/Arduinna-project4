var mongoose = require('mongoose');

var dataSchema = mongoose.Schema({
	values: [{
		date: Date,
		reading: Number

	}],
	updatedAt: Date 
});

var Datos = mongoose.model('Data', dataSchema);

module.exports = Datos;