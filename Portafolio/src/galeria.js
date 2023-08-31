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
]

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