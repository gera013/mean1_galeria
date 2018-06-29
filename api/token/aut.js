'use strict'

var token = require ("jwt-simple");
var momento = require("moment");
var claveSecreta = "clave_secreta";

/*================================
Metodo de la autenticacion
================================*/

//creamos un middleware

exports.autenticacion = function (req, res, next){
    
    //pasamos el token por una cabecera de autenticacion

    if(!req.headers.authorization){
        
        return res.status(403).send({mensaje: "La peticion no tiene la cabecera de autenticacion"});

    }else{

        //quitamos las comillas simples y dobles al token con el metodo replace

        var tokenEnviado = req.headers.authorization.replace(/['"]/g, '');

        //sentencias de manejo de excepciones

        /*La sentencia try...catch marca un bloque de instrucciones a intentar que puedan causar alguna excepcion, y declarar una o mas
        respuestas en caso de que una excepcion sea arrojada. si una excepcion es arrojada, la sentencia try... catch se encarga de
        atraparla.*/

        try{

            var cargarToken = token.decode(tokenEnviado, claveSecreta);

            //comparar la fecha actual con la expiracion del token

            if(cargarToken.exp <= momento().unix()){

                return res.status(403).send({mensaje: "El token ha expirado"});

            }
            //un bloque catch es usado para capturar todas las excepciones que pueden ser generadas en el bloque try
        }catch(exception){

            console.log(exception);
            return res.status(403).send({mensaje: "El token no es valido"});
            
        }

        /*Añadimos al objeto request una propiedad de usuario para siempre tener disponible el token en cualquier sesion.
        Con esto no tenemos que estar descodificando el token en cada sesion que ingrese el usuario.*/
        
        req.usuarioToken = cargarToken;

        next();
    }
}