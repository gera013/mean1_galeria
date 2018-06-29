'use strict'

//metodo de prueba
function pruebaSlides(req,res){
    res.status(200).send({mensaje:"Probando el controlaor de slides"});
}

var Slides = require("../modelos/slides.modelo.js");

var fs = require("fs");
var path = require("path");

//funcion para crear slide
function crearSlide(req, res){

    //creamos una variable que traiga el objeto dle modelo slides
    var slides = new Slides();

    //recogemos los parametros que llegan por la peticion post
    var parametros = req.body;

    console.log("parametros", parametros);

    slides.titulo = parametros.titulo;
    slides.descripcion = parametros.descripcion;
    if(req.files){
        
        var imagenRuta =req.files.imagen.path;
        var imagenSplit = imagenRuta.split("\\");

        slides.imagen = imagenSplit[2];

        if(slides.titulo != null && slides.descripcion != null){
            slides.save((error, slideGuardado) => {
                if(error){
                    res.status(500).send({mensjae: "Error al guardar el slide"});
                }else{
                    if(!slideGuardado){
                        res.status(404).send({mensaje: "No se ha podido guardar el slide"});
                    }else{
                        res.status(200).send({slideGuardado});
                    }
                }
            });
        }
    }
}

//mostrar slides
function mostrarSlides(req, res){
    Slides.find((error, mostrandoSlides) => {
        if(error){
            res.status(500).send({mensaje: "Ërror en la peticion"});
        }else{
            res.status(200).send({mostrandoSlides});
        }
    }).sort("_id");
}


//actualizar slide
function actualizarSlide(req, res){
    var slides = Slides();

    var id = req.params.id;
    var parametros = req.body;

    slides.titulo = parametros.titulo;
    slides.descripcion = parametros.descripcion;

    var cambioImagen = false;

    if(parametros.actualizarImagen == "0"){

        slides.imagen = parametros.rutaImagenActual;
        cambioImagen = true;
    }else{

        if(req.files){
        
            var imagenRuta =req.files.imagen.path;
            var imagenSplit = imagenRuta.split("\\");
    
            slides.imagen = imagenSplit[2];

            var antiguaImagen = parametros.rutaImagenActual;
            var rutaImagen = "./ficheros/slide/"+antiguaImagen;

            fs.unlink(rutaImagen);
        }

        cambioImagen = true;

    }

    if(cambioImagen){

        if(slides.titulo != null && slides.descripcion != null && slides.imagen != null){
            
            var actualizar = {
                "titulo": slides.titulo,
                "descripcion": slides.descripcion,
                "imagen": slides.imagen
            }

            Slides.findByIdAndUpdate(id, actualizar, (error, slideActualizado) =>  {

                if(error){

                    res.status(500).send({mensaje: "Error al actualizar el Slide"});

                }else{

                    if(!slideActualizado){

                        res.status(404).send({mensaje: "No se ha podido actualizar el slide"});

                    }
                    else{
                        res.status(200).send({slideActualizado});
                    }

                }

            });

        }

    }
}

//borrar slide
function borrarSlide(req, res){

    var id = req.params.id;

    Slides.findOne({_id: id}, (error, capturarSlide) => {
        if(error){
            
            res.status(500).send({mensaje: "Error al capturar el slide"});

        }else{

            if(!capturarSlide){

                res.status(404).send({mensaje: "No se ha podido capturar el Slide"});

            }else{

                var antiguaImagen = capturarSlide.imagen;
                var rutaImagen = "./ficheros/slide/"+antiguaImagen;
                fs.unlink(rutaImagen);

            }

        }

    });

    setTimeout(function(){

        Slides.findByIdAndRemove(id, (error, borrarSlide) => {
       
            if(error){
                
                res.status(500).send({mensaje: "Error al borrar el slide"});
    
            }else{
    
                if(!borrarSlide){
    
                    res.status(404).send({mensaje: "No se ha podido borrar el Slide"});
    
                }else{
    
                    res.status(200).send({borrarSlide});
    
                }
            }
    
        });

    },1000);

}

//Tomar imagen slide
function tomarImagenSlide(req, res){
    
    var imagen = req.params.imagen;
    var rutaImagen = "./ficheros/slide/"+imagen;

    fs.exists(rutaImagen, function(exists){
        
        if(exists){
            
            res.sendFile(path.resolve(rutaImagen));
        
        }else{

            res.status(404).send({mensaje: "La imagen no existe"});

        }

    });

}

//Exportamos los metodos del modulo
module.exports = {
    pruebaSlides,
    crearSlide,
    mostrarSlides,
    actualizarSlide,
    borrarSlide,
    tomarImagenSlide
}