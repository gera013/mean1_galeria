'use strict'

var express = require("express");

var ControladorGalerias = require("../controladores/galerias.controlador.js");

var api = express.Router();

//cargamos la dependencia para subir ficheros o archivos
var multipart = require("connect-multiparty");

var fichero = multipart({
    //ruta donde se suben las imagenes
    uploadDir: "./ficheros/galeria"
});

var md_aut = require("../token/aut.js");

api.get("/probando-controlador-galerias",ControladorGalerias.pruebaGalerias);
//creamos la ruta para crear una imagen para la galeria utilizando el token de aut y la ruta donde se van a subir las imagenes
api.post("/crear-foto", [md_aut.autenticacion, fichero], ControladorGalerias.crearFoto)

api.get("/mostrar-fotos",ControladorGalerias.mostrarFotos);

api.delete("/borrar-foto/:id", [md_aut.autenticacion, fichero], ControladorGalerias.borrarFoto);

api.get("/tomar-imagen-galeria/:foto", ControladorGalerias.tomarFotoGaleria);

module.exports = api;