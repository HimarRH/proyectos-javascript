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

export default siguientePaso;