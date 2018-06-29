'use strict'

var express = require("express");

//Cargamos el modulo del contralador
var ControladorUsuarios = require("../controladores/usuarios.controlador.js");

//cargamos el route de express.js y con esto podemos crear rutas para nuestra api rest.
var api = express.Router();

var md_aut = require("../token/aut.js");

/*creamos la ruta con el metodo GET, para pasar el metodo que va tener que cargar la pagina
cuando hagamos la peticion http de esa ruta*/
api.get("/probando-controlador-usuarios", md_aut.autenticacion, ControladorUsuarios.pruebaUsuarios);

//creamos la ruta para crear usuarios y utilizamos el metodo post
api.post("/crear-usuarios", ControladorUsuarios.crearUsuarios);

//creamos la ruta para el ingreso de usuario y utilizamos el metodo post
api.post("/login", ControladorUsuarios.ingresoUsuario);

//creamos la ruta para la actualizacion del usuario y utilizamos el metodo PUT
api.put("/actualizar-usuario/:id", md_aut.autenticacion, ControladorUsuarios.actualizarUsuario);

//creamos la ruta para borrar usuario y utilizamos el metodo DELETE
api.delete("/borrar-usuario/:id", md_aut.autenticacion, ControladorUsuarios.borrarUsuario);

//Exportamos el modulo api
module.exports = api;