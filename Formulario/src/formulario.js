import validarCantidad from "./validaciones/validarCantidad";

import validarNombre from "./validaciones/validarNombre";

import validarCorreo from "./validaciones/validarCorreo";

import marcarPaso from "./marcarPaso";

import siguientePaso from "./siguientePaso";



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
            btnFormulario.querySelector('[data-icono="banco"]').classList.add('formulario__btn-contenedor-icono--active')

        siguientePaso();

        setTimeout(()=>{

            btnFormulario.classList.remove('formulario__btn--disabled')
        },4000);
    
    } else if (pasoActual === 'confirmacion' && !btnFormulario.matches('.formulario__btn--disabled')){
        //Aquí debería ir la petición al servidor

        // Cambiar el texto del boton a transferir
        btnFormulario.querySelector('span').innerText = 'Transfiriendo';
        btnFormulario.classList.add('formulario__btn--disabled');

        setTimeout(()=>{
            formulario.classList.add('formulario--hidden');
            document.getElementById('alerta').classList.add('alerta--active');
        },4000)




    }
});
