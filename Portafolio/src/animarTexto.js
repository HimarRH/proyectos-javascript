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
            cursor.classList.add('hero__cursor--active')
        }

    },numeroLetras*200)

    //Retorna la promesa cuando termina la animación
    return new Promise(resolve=>setTimeout(resolve, numeroLetras*200));

};

export default animarTexto;