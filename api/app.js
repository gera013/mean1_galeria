'use strict'
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

//esto lo qu ehace es convertir a objetos json los adatos que nos llegan
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/*Cargar rutas*/
var rutaUsuarios = require("./rutas/usuarios.ruta.js");
var rutaSlides = require("./rutas/slides.ruta.js");
var rutaGalerias = require("./rutas/galerias.ruta.js");
/*Cabeceras HTTP*/
app.use(function(req, res, next) {
    
res.header("Access-Control-Allow-Origin","*");

res.header("Access-Control-Allow-Headers","Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");

res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE");

res.header("Allow","GET, POST, PUT, DELETE");

next();

});


/* Rutas Base*/
app.use("/api", rutaUsuarios);
app.use("/api", rutaSlides);
app.use("/api", rutaGalerias);


    
/*
app.get("/pruebas", function(req, res){
    res.status(200).send({message:"Bienvenido"});
});*/

module.exports = app;