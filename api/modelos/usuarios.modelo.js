'use strict'

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UsuariosSchema = Schema({
    usuario: String,
    password: String
});

module.exports = mongoose.model("Usuario", UsuariosSchema);