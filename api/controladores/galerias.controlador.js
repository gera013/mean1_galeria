'use strict'

function pruebaGalerias(req, res){
    res.status(200).send({mensaje:"probando el controlador de galerias"});
}

var Galerias = require("../modelos/galerias.modelo.js");

var fs = require("fs");

var path = require("path");

//crear foto
function crearFoto(req, res){
    var galeria = new Galerias();
    if(req.files){
        var imagenRuta = req.files.foto.path;
        var imagenSplit = imagenRuta.split("\\");

        galeria.foto = imagenSplit[2];

        galeria.save((error, fotoGuardada) => {
            if(error){
                res.status(500).send({mensjae: "Error al guardar la foto"});
            }else{
                if(!fotoGuardada){
                    res.status(404).send({mensjae: "No se ha podido guardar la foto"});
                }else{
                    res.status(200).send({fotoGuardada});
                }
            }
        })

    }
}
//mostrar galeria
function mostrarFotos(req, res){
    Galerias.find((error, mostrarFotos) => {
        if(error){
            res.status(500).send({mensaje: "Error en la peticion"});
        }else{
            res.status(200).send({mostrarFotos});
        }
    });
}

//borrar foto
function borrarFoto(req, res){

    var id = req.params.id;

    Galerias.findOne({_id: id}, (error, capturarFoto) => {
        if(error){
            
            res.status(500).send({mensaje: "Error al capturar la foto"});

        }else{

            if(!capturarFoto){

                res.status(404).send({mensaje: "No se ha podido capturar la foto"});

            }else{

                var antiguaImagen = capturarFoto.foto;
                var rutaImagen = "./ficheros/galeria/"+antiguaImagen;
                fs.unlink(rutaImagen);

            }

        }

    });

    setTimeout(function(){

        Galerias.findByIdAndRemove(id, (error, borrarFoto) => {
       
            if(error){
                
                res.status(500).send({mensaje: "Error al borrar la foto"});
    
            }else{
    
                if(!borrarFoto){
    
                    res.status(404).send({mensaje: "No se ha podido borrar la foto"});
    
                }else{
    
                    res.status(200).send({borrarFoto});
    
                }
            }
    
        });
        
    },1000);

}

//tomar foto galeria

function tomarFotoGaleria(req, res){

    var imagen = req.params.foto;
    var rutaImagen = "./ficheros/galeria/"+imagen;

    fs.exists(rutaImagen, function(exists){
        
        if(exists){
        
            res.sendFile(path.resolve(rutaImagen));
        
        }else{

            res.status(404).send({mensaje: "La imagen no existe"});

        }

    });


}

module.exports = {
    pruebaGalerias,
    crearFoto,
    mostrarFotos,
    borrarFoto,
    tomarFotoGaleria
}