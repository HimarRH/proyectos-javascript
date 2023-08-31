'use strict';

const formulario$3 = document.getElementById('formulario');

const validarCantidad = ()=>{
    //Acepta cualquier digito (0-9) y un punto con decimales(opcional)
    const expRegCantidad = /^\d+(\.\d+)?$/;
    
    const inputCantidad = formulario$3.cantidad;

    if(expRegCantidad.test(inputCantidad.value)){

        inputCantidad.classList.remove('formulario__input--error');
        return true;

    }else {
        inputCantidad.classList.add('formulario__input--error');
        return false;
    }


};

const formulario$2 = document.getElementById('formulario');

const validarNombre = ()=>{
    //Acepta cualquier digito (0-9) y un punto con decimales(opcional)
    const expRegNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    
    const inputNombre = formulario$2['nombre-receptor'];

    if(expRegNombre.test(inputNombre.value)){

        inputNombre.classList.remove('formulario__input--error');
        return true;

    }else {
        inputNombre.classList.add('formulario__input--error');
        return false;
    }


};

const formulario$1 = document.getElementById('formulario');

const validarCorreo = ()=>{
    //Acepta una cadena de correo electronico
    const expRegCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    
    const inputCorreo = formulario$1['correo-receptor'];

    if(expRegCorreo.test(inputCorreo.value)){

        inputCorreo.classList.remove('formulario__input--error');
        return true;

    }else {
        inputCorreo.classList.add('formulario__input--error');
        return false;
    }


};

const marcarPaso = (paso)=>{
document.querySelector(`.linea-pasos [data-paso="${paso}"] span`).classList.add('linea-pasos__paso-check--checked');
};

const siguientePaso = ()=>{
    
    //Crear un array que contenga todo los pasos
    const pasos = [...document.querySelectorAll('.linea-pasos__paso')];

    //Obtener paso Activo
    const pasoActivo = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso');

    //Obtener paso Activo
    const indexPasoActivo = pasos.indexOf(pasoActivo);

    if(indexPasoActivo<pasos.length - 1){

        // Eliminar clase activa
       pasoActivo.querySelector('span').classList.remove('linea-pasos__paso-check--active'); 

       //Ponemos la clase de paso activo en el siguiente elemento
       pasos[indexPasoActivo +1].querySelector('span').classList.add('linea-pasos__paso-check--active');

       const id = pasos[indexPasoActivo +1].dataset.paso;
       document.querySelector(`.formulario__body [data-paso="${id}"]`).scrollIntoView({
            inline: 'start',
            behavior: 'smooth',
       });

    }


};

const formulario = document.getElementById('formulario');
const btnFormulario = document.getElementById('formulario__btn');

//Reiniciando el formulario
formulario.querySelector('.formulario__body').scrollLeft = 0;

//EventListener para comprobar los campos de formulario cuando el usuario corrige
formulario.addEventListener('keyup', (e)=>{
   if(e.target.tagName === 'INPUT'){
        if(e.target.id === 'cantidad'){
            validarCantidad();
        } else if (e.target.id ==='nombre-receptor'){
            validarNombre();
        } else if (e.target.id === 'correo-receptor'){
            validarCorreo();
        }
   }
});

//EventListener para comprobar la cantidad al darle al botón siguiente
btnFormulario.addEventListener('click',(e)=>{
    e.preventDefault();

    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;
    
    if(pasoActual === 'cantidad'){
        
        if (validarCantidad()){
            marcarPaso('cantidad');
            siguientePaso();
        } 


    } else if (pasoActual === 'datos'){
        if (validarNombre() && validarCorreo()){
            marcarPaso('datos');
            siguientePaso();
        } 

    } else if (pasoActual === 'metodo'){
        marcarPaso('metodo');

        //Formato de moneda
        const formatoMoneda = new Intl.NumberFormat('es-ES', {style: 'currency', currency:'EUR'});

        // Recoge los datos del formulario para llevarlos a la última parte
        document.querySelector('[data-valor="cantidad"] span').innerText = formatoMoneda.format(formulario.cantidad.value);

        document.querySelector('[data-valor="nombre-receptor"] span').innerText = formulario['nombre-receptor'].value;

        document.querySelector('[data-valor="correo-receptor"] span').innerText = formulario['correo-receptor'].value;

        document.querySelector('[data-valor="metodo"] span').innerText = formulario.metodo.value;

        //Cambiar el botón
        btnFormulario.querySelector('span').innerHTML = 'Transferir';

        //Agregar la clase deshabilitar el boton
        btnFormulario.classList.add('formulario__btn--disabled');

        //Activar boton de transferir
            //Desactivar el boton siguiente
            btnFormulario.querySelector('[data-icono="siguiente"]').classList.remove('formulario__btn-contenedor-icono--active');
            //Añadir icono de banco al botón
            btnFormulario.querySelector('[data-icono="banco"]').classList.add('formulario__btn-contenedor-icono--active');

        siguientePaso();

        setTimeout(()=>{

            btnFormulario.classList.remove('formulario__btn--disabled');
        },4000);
    
    } else if (pasoActual === 'confirmacion' && !btnFormulario.matches('.formulario__btn--disabled')){
        //Aquí debería ir la petición al servidor

        // Cambiar el texto del boton a transferir
        btnFormulario.querySelector('span').innerText = 'Transfiriendo';
        btnFormulario.classList.add('formulario__btn--disabled');

        setTimeout(()=>{
            formulario.classList.add('formulario--hidden');
            document.getElementById('alerta').classList.add('alerta--active');
        },4000);




    }
});

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
//# sourceMappingURL=bundle.js.map
