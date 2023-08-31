import cerrarGaleria from "./cerrarGaleria";
import slideClic from "./slideClic";
import { cargarAnteriorSiguiente } from "./cargarImagen";
import carrusel from "./carrusel";

const galeria = document.getElementById('galeria');
galeria.addEventListener('click', (e)=>{
    const boton = e.target.closest('button');
    //--CERRAR GALERÍA
    if( boton?.dataset?.accion==='cerrar-galeria'){ 
        cerrarGaleria();
    } 

    //--CARRUSEL SLIDE CLIK
    if(e.target.dataset.id){
        slideClic(e);
    }

    //--SIGUIENTE IMAGEN
    if(boton?.dataset?.accion==='siguiente-imagen'){
        cargarAnteriorSiguiente('siguiente');
    }

    //--ANTERIOR IMAGEN
    if(boton?.dataset?.accion==='anterior-imagen'){
        cargarAnteriorSiguiente('anterior');
    }

     //--CARRUSEL ADELANTE
     if(boton?.dataset?.accion==='siguiente-slide'){
        carrusel('adelante');
    }

    //--CARRUSEL ATRÁS
    if(boton?.dataset?.accion==='anterior-slide'){
        carrusel('atras');
    }


});

