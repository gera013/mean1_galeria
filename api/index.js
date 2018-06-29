'use strict'

/*=============================
libreria mongodb
==============================*/
var mongoose = require('mongoose');

/*=======================================
Modulo express
=======================================*/
var app = require("./app");
var port = process.env.PORT || 1234;

/*=============================
conexion a base de datos
==============================*/
mongoose.connect('mongodb://localhost:27017/mongodb',(error, respuesta) => {
    if(error){
        throw error;
    }else{
        console.log("La conexion a la base de datos esta correcta");
       app.listen(port, function(){
            console.log("Servidor del ApiRest en http://localhost:"+port);
       });
    }
});