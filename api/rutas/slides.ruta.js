'use strict'

var express = require("express");

var ControladorSlides = require("../controladores/slides.controlador.js");

var api = express.Router();

//cargamos la dependencia para subir ficheros o archivos
var multipart = require("connect-multiparty");

var fichero = multipart({
    //ruta donde se suben las imagenes
    uploadDir: "./ficheros/slide"
});

var md_aut = require("../token/aut.js");

api.get("/probando-controlador-slides", ControladorSlides.pruebaSlides);
//creamos la ruta para crear un slide utilizando el token de aut y la ruta donde se van a subir las imagenes
api.post("/crear-slide", [md_aut.autenticacion, fichero], ControladorSlides.crearSlide);

api.get("/mostrar-slides",ControladorSlides.mostrarSlides);

api.put("/actualizar-slide/:id", [md_aut.autenticacion, fichero], ControladorSlides.actualizarSlide);

api.delete("/borrar-slide/:id", md_aut.autenticacion, ControladorSlides.borrarSlide);

api.get("/tomar-imagen-slide/:imagen", ControladorSlides.tomarImagenSlide);

module.exports = api;