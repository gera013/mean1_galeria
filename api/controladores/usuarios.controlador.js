'use strict'

//metodo de prueba
function pruebaUsuarios(req,res){
    res.status(200).send({mensaje:"Probando el controlaor de usuarios"});
}

//importamos el modelo de usuarios
var Usuarios = require("../modelos/usuarios.modelo.js");

//importamos la dependencia para increptar contraseñas
var bcrypt = require("bcrypt");

//importamos le token
var token = require("../token/token.js");

//metodo para crear usuarios
function crearUsuarios(req, res){
    //creamos una variable que traiga el objeto dle modelo usuarios
    var usuarios = new Usuarios();
    //recogemos los parametros que vienen del metodo post
    var parametros = req.body;
    usuarios.usuario = parametros.usuario;
    if(parametros.password){
        bcrypt.hash(parametros.password, 10, function(err, hash){
            usuarios.password = hash;
            if(usuarios.usuario != null){
                usuarios.save((error, usuarioGuardado)=>{
                    if(error){
                        res.status(500).send({mensaje:"Error al guardar el usuario"});
                    }else{
                        res.status(200).send({usuarioGuardado});
                    }
                });
            }
        });
    }   
}
//metodo para ingreso de usuarios
function ingresoUsuario(req, res){
    var parametros = req.body;
    var usuario = parametros.usuario;
    var password = parametros.password;
    Usuarios.findOne({usuario:usuario},(error,seleccionUsuario)=>{
        if(error){
            res.status(500).send({mensaje:"Error al ingresar el usuario"});
        }else{
            if(!seleccionUsuario){
                res.status(404).send({mensaje:"El usuario no existe"});
            }else{
                bcrypt.compare(password,seleccionUsuario.password,function(error, ok){
                    if(ok){
                        //debemos enviar un parametro token en verdadero
                        if(parametros.token){
                           //devolvemos un token jwt 
                           res.status(200).send({token: token.crearToken(seleccionUsuario), seleccionUsuario});
                        }
                        //res.status(200).send({seleccionUsuario});
                    }else{
                        res.status(404).send({mensaje: "El usuario no ha podido ingresar"});
                    }
                });
            }
        }
    });
}

function actualizarUsuario(req, res){
    
    //Llamamos por parametro el id que necesitamos actualizar
    var id = req.params.id;

    //Tomamos los datos del formulario
    var actualizar = req.body;

    if(id != req.usuarioToken.sub){
        return res.status(500).send({mensaje: "No tienes permisos para actualizar este usuario"});
    }

    //Recorremos la base de datos con el metodo findByIdAndUpdate
    Usuarios.findByIdAndUpdate(id, actualizar, (error, usuarioActualizado) =>{
        if(error){
            
            res.status(500).send({mensaje: "Error al actualizar el usuario"});
        
        }else{
            if(!usuarioActualizado){

                res.status(404).send({mensaje: "No se ha podido actualizar el usuario"});

            }else{

                res.status(200).send({usuarioActualizado});

            }
        }
    });
}

//metodo para borrar usuario
function borrarUsuario(req, res){

    var id = req.params.id;

    if(id != req.usuarioToken.sub){
        return res.status(500).send({mensaje: "No tienes permisos para actualizar este usuario"});
    }

    Usuarios.findByIdAndRemove(id, (error, usuarioBorrado) =>{

        if(error){
            
            res.status(500).send({mensaje: "Error al borrar el usuario"});
        
        }else{

            if(!usuarioBorrado){

                res.status(404).send({mensaje: "No se ha podido borrar el usuario"});

            }else{

                res.status(200).send({usuarioBorrado});

            }

        }

    });
}

//Exportamos los metodos del modulo
module.exports = {
    pruebaUsuarios,
    crearUsuarios,
    ingresoUsuario,
    actualizarUsuario,
    borrarUsuario
}