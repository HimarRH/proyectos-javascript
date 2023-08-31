'use strict';

const animarTexto = (element)=>{
    const numeroLetras = element.dataset.texto.length;

    //Activar el cursor con la animación
    const cursor = element.querySelector('.hero__cursor');
    cursor.classList.add('hero__cursor--visible');

    //Hacer aparecer las letras
    for (let i = 0; i<numeroLetras ; i++ ){
        setTimeout(()=>{//Ejecuta la funciona cuando pasan 100 ms
            const letra = document.createElement('span');//Crea un span por cada letra
            letra.append(element.dataset.texto[i]);//Coge la letra que debe aparecer
            element.append(letra);//Introduce la letra dentro del span
        },200*i);
    }

    setTimeout(()=>{
        //Obtenemos los cursores
        const cursores = [...element.closest('.hero__header').querySelectorAll('.hero__cursor')];
        //Obtener el Index
        const cursorActual = cursores.indexOf(cursor);

        //Comprobar que no es el último cursor
        if(cursorActual<cursores.length -1){
            cursor.classList.remove('hero__cursor--visible');
        } else {
            cursor.classList.add('hero__cursor--active');
        }

    },numeroLetras*200);

    //Retorna la promesa cuando termina la animación
    return new Promise(resolve=>setTimeout(resolve, numeroLetras*200));

};

const galeria$1 = document.querySelector('#trabajos');

const observer = new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){
        const trabajos = galeria$1.querySelectorAll('.trabajos__imagenes a');
        trabajos.forEach((trabajo, index)=>{
            setTimeout(()=>{
                trabajo.classList.add('trabajos__trabajo--visible');
            },200*index);
            
        });
    }
},{
    rootMargin:'0px 0px 0px 0px',
    threshold: .5,
});

observer.observe(galeria$1);

const galeria = document.querySelector('#trabajos');
const ventana = document.querySelector('#ventana-trabajos');
const datos = [
    {
        id: '1',
        titulo: 'Trabajo #1',
        texto: 'Lorem fistrum pecador diodeno al ataquerl veniam. Dolor pupita elit quis te voy a borrar el cerito esse. Apetecan a gramenawer fistro sexuarl dolor me cago en tus muelas torpedo quis ese hombree irure voluptate.',
        fecha: '1 Enero de 2023'
    },
    {
        id: '2',
        titulo: 'Trabajo #2',
        texto: 'Lorem fistrum pecador diodeno al ataquerl veniam. Dolor pupita elit quis te voy a borrar el cerito esse. Apetecan a gramenawer fistro sexuarl dolor me cago en tus muelas torpedo quis ese hombree irure voluptate.',
        fecha: '2 Enero de 2023'
    },
    {
        id: '3',
        titulo: 'Trabajo #3',
        texto: 'Lorem fistrum pecador diodeno al ataquerl veniam. Dolor pupita elit quis te voy a borrar el cerito esse. Apetecan a gramenawer fistro sexuarl dolor me cago en tus muelas torpedo quis ese hombree irure voluptate.',
        fecha: '3 Enero de 2023'
    },
    {
        id: '4',
        titulo: 'Trabajo #4',
        texto: 'Lorem fistrum pecador diodeno al ataquerl veniam. Dolor pupita elit quis te voy a borrar el cerito esse. Apetecan a gramenawer fistro sexuarl dolor me cago en tus muelas torpedo quis ese hombree irure voluptate.',
        fecha: '4 Enero de 2023'
    },
    {
        id: '5',
        titulo: 'Trabajo #5',
        texto: 'Lorem fistrum pecador diodeno al ataquerl veniam. Dolor pupita elit quis te voy a borrar el cerito esse. Apetecan a gramenawer fistro sexuarl dolor me cago en tus muelas torpedo quis ese hombree irure voluptate.',
        fecha: '5 Enero de 2023'
    },
    {
        id: '6',
        titulo: 'Trabajo #6',
        texto: 'Lorem fistrum pecador diodeno al ataquerl veniam. Dolor pupita elit quis te voy a borrar el cerito esse. Apetecan a gramenawer fistro sexuarl dolor me cago en tus muelas torpedo quis ese hombree irure voluptate.',
        fecha: '6 Enero de 2023'
    },
];

galeria.addEventListener('click',(e)=>{
    e.preventDefault();

    //Comprobar que el click es en la imagen
    const trabajo = e.target.closest('.trabajos__trabajo');

    if(trabajo){
        //Obtener el id de la imagen en la que se hace clik
        const id = trabajo.dataset.id;

        const trabajoFiltrado = datos.filter((galeria)=>{
        
            if (galeria.id === id){
                return galeria;
            }
        });

        const { titulo, fecha, texto } = trabajoFiltrado[0];

        ventana.querySelector('.ventana__titulo').innerText = titulo;
        ventana.querySelector('.ventana__fecha').innerText = fecha;
        ventana.querySelector('.ventana__parrafo').innerText = texto;
        ventana.querySelector('.ventana__imagen').src = trabajo.querySelector('img').src;
        ventana.classList.add('ventana--active');
    }

});

//Event Listener para cerrar la ventana de trabajos
ventana.querySelector('button[data-action="cerrar-ventana"]').addEventListener('click',(e)=>{
    e.preventDefault();
    ventana.classList.remove('ventana--active');
});

//Event Listener para cerrar la ventana si pulsan fuera de ella
ventana.querySelector('.ventana__overlay').addEventListener('click',(e)=>{
    e.preventDefault();
    if (e.target.matches('.ventana__overlay')){
        ventana.classList.remove('ventana--active');
    }
    
});

const comentarios = document.querySelector('#slider');
let click = false;
let coordenadaInicial;
let scrollLeft;

const presiona = (e)=>{
    click = true;

    coordenadaInicial= e.pageX-comentarios.offsetLeft;
    scrollLeft = comentarios.scrollLeft;

    //e.pageX - Coordenada horizontal del evento. En que coordenada se hace click respecto al documento
    //offsetLeft nos da el valor del espacio que queda fuera del scroll
    
};
const mueve = (e)=>{
    if(!click){
        return;
    }
    const espacio = e.pageX -comentarios.offsetLeft;
    const distanciaRecorrida = espacio -coordenadaInicial;
    
    comentarios.scrollLeft = scrollLeft-distanciaRecorrida;

};
const soltar = (e)=>{
    click = false;

};

comentarios.addEventListener('mousedown',presiona);
comentarios.addEventListener('mousemove',mueve);
comentarios.addEventListener('mouseup',soltar);

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

window.addEventListener('load',async()=>{
    await animarTexto(document.querySelector('.hero__titulo--uno'));
    await animarTexto(document.querySelector('.hero__titulo--dos'));

    document.querySelectorAll('.hero__burbuja')[0].classList.add('hero__burbuja--active-1');
    document.querySelectorAll('.hero__burbuja')[1].classList.add('hero__burbuja--active-2');

});
//# sourceMappingURL=bundle.js.map
