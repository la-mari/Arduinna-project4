var mongoose = require('mongoose');

var dataSchema = mongoose.Schema({
	type: String,
	value: Number,
	createdAt: Date 
})

var Data = mongoose.model('Data', dataSchema);

module.exports = Data;