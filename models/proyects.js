'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProyectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: [String]
});

module.exports = mongoose.model('Proyect' , ProyectSchema);