import cargarTitulos from "./cargarTitulos";
import fetchBusqueda from "./fetchBusqueda";

const pagAnterior = document.getElementById('pagina-anterior');
const pagSiguiente = document.getElementById('pagina-siguiente');

pagSiguiente.addEventListener('click',async(e)=>{
    let paginaActual = document.getElementById('populares').dataset.pagina;

    try {
        const result = await fetchBusqueda(paginaActual ++);
        document.getElementById('populares').setAttribute('data-pagina',parseInt(paginaActual ++));
        cargarTitulos(result);
        window.scrollTo(0,0);
    }catch(e){
        console.log(e);
    };
});

pagAnterior.addEventListener('click',async(e)=>{
    let paginaActual = document.getElementById('populares').dataset.pagina;
    if(paginaActual>1){
        try {
            const result = await fetchBusqueda(paginaActual --);
            document.getElementById('populares').setAttribute('data-pagina',parseInt(paginaActual --));
            cargarTitulos(result);
            window.scrollTo(0,0);
        }catch(e){
            console.log(e);
        };    
    };
    

});