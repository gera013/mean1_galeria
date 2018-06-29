'use strict'

//requerimos la dependencia jwt simple para crear el token
var token = require("jwt-simple");

//momnet: Esta dependencia nos permite hacer registro de fecha de creacion del token y la fecha de expiracion de ese mismo token
var momento = require("moment");

//con esta clave secreta podemos descodificar el token
var claveSecreta = "clave_secreta";

/*==============================
Metodo del Token
===============================*/

exports.crearToken = function(usuario){
    var cargarToken = {
        //Se usa para guardar le id del documento
        sub: usuario._id,
        nombre: usuario.usuario,
        //unix() formato timestamp actual
        now: momento().unix(),
        exp: momento().add(30, "days").unix()
    }
    //devolvemos le token codificado
    return token.encode(cargarToken, claveSecreta);
}