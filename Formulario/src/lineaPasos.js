import validarCantidad from "./validaciones/validarCantidad";
import validarNombre from "./validaciones/validarNombre";
import validarCorreo from "./validaciones/validarCorreo";

const line = document.getElementById('linea-pasos');

line.addEventListener('click',(e)=>{
   if(!e.target.closest('.linea-pasos__paso')){
        return false;
   }

   const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;

   //Validar el paso actual
   if(pasoActual === 'cantidad'){
    if(!validarCantidad()){
        return false;
    } 
   }else if (pasoActual === 'datos'){
     if(!validarNombre() || !validarCorreo()){
        return false;
     } 
   }

   //Obtenemos el paso al que queremos ir
   const pasoNavegar = e.target.closest('.linea-pasos__paso');

   if(pasoNavegar.querySelector('.linea-pasos__paso-check--checked')){
    const pasoActual = line.querySelector('.linea-pasos__paso-check--active');
    pasoActual.classList.remove('linea-pasos__paso-check--active');

    // Obtener el identificado del paso al que queremos acudir
    const id = pasoNavegar.dataset.paso;

    // Agregar la clase activa
    line.querySelector(`[data-paso="${id}"] span`).classList.add('linea-pasos__paso-check--active');

    // Cambiar el boton
    const btnFormulario = document.querySelector('#formulario__btn');
    btnFormulario.querySelector('span').innerText = 'Siguiente';

    //Quitamos el icono del banco
    btnFormulario.querySelector('[data-icono="banco"]').classList.remove('formulario__btn-contenedor-icono--active');

    //Agregamos el icono de siguiente
    btnFormulario.querySelector('[data-icono="siguiente"]').classList.add('formulario__btn-contenedor-icono--active');

    //Descativamos la clase que desactivaba el botón de forma momentánea
    btnFormulario.classList.remove('formulario__btn--disabled');

    //Navegar al paso que deseamos
    document.querySelector(`.formulario__body [data-paso="${id}"`).scrollIntoView({
        inline: 'start',
        behavior: 'smooth',
    });

   


   }

   

});