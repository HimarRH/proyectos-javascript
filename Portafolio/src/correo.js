const botones = document.querySelectorAll('[data-action="abrir-ventana-correo"]');
const cerrar = document.querySelectorAll('[data-action="cerrar-ventana"]');
const correo = document.querySelector('#ventana-correo');

botones.forEach((boton)=>{
    boton.addEventListener('click',(e)=>{
        e.preventDefault();

        correo.classList.add('ventana--active');

    });

});

cerrar.forEach((boton)=>{
    boton.addEventListener('click',(e)=>{
        e.preventDefault();

        correo.classList.remove('ventana--active');

    });

});

