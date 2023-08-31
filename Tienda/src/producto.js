const producto = document.getElementById('producto');
const productoImagen = producto.querySelector('.producto__imagen');
const thumbs = producto.querySelector('.producto__thumbs');

// Acceder al color
const propiedadColor = producto.querySelector('#propiedad-color');

//Acceder a cantidad
const btnDisminuirCantidad = producto.querySelector('#disminuir-cantidad');
const btnIncrementarCantidad = producto.querySelector('#incrementar-cantidad');
const inputCantidad = producto.querySelector('#cantidad');


// Funcionalidad de los thumbsnails
thumbs.addEventListener('click', (e)=>{
    if(e.target.tagName === 'IMG'){
        const imagenSrc = e.target.src;

        // Obtiene la posición del último "/"
        const lastIndex = imagenSrc.lastIndexOf('/');
        // Corta la cadena de texto para quedarnos solo con la última parte.
        const nombreImagen = imagenSrc.substring(lastIndex +1);
        // Cambia la ruta de la imagen por la nueva que hemos obtenido anteriormente.
        productoImagen.src = `./img/tennis/${nombreImagen}`;
    }
});

// Funcionalidad Color de zapatillas
propiedadColor.addEventListener('click',(e)=>{
    if(e.target.tagName === 'INPUT'){

        const color = e.target.value;
        productoImagen.src = `./img/tennis/${color}.jpg`;
        
    }
    
})

// Incrementar cantidad
btnIncrementarCantidad.addEventListener('click', (e)=>{
    inputCantidad.value = parseInt(inputCantidad.value) +1;
});

// Disminuir cantidad
btnDisminuirCantidad.addEventListener('click',(e)=>{
    if(parseInt(inputCantidad.value)>1){
        inputCantidad.value = parseInt(inputCantidad.value) -1;
    }
    
});