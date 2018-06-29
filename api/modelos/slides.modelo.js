'use strict'

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SlidesSchema = Schema({
    imagen: String,
    titulo: String,
    descripcion: String
});

module.exports = mongoose.model("Slides", SlidesSchema);