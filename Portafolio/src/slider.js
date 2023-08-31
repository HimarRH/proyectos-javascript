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