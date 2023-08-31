import cargarGeneros from "./cargarGeneros";
import cargarTitulos from "./cargarTitulos";
import fetchPopulares from "./fetchPopulares";

const filtroPelicula = document.getElementById('movie');
const filtroSerie = document.getElementById('tv');

filtroPelicula.addEventListener('click', async(e)=>{
    e.preventDefault();

    //Carga el genero de las series
    cargarGeneros('movie');

    // Obtiene los resultados de las series
    const resultados = await fetchPopulares('movie');
    // Carga la series en el DOM
    cargarTitulos(resultados);

    filtroSerie.classList.remove('btn--active');
    filtroPelicula.classList.add('btn--active');
    document.querySelector('#populares .main__titulo').innerText = 'Películas Populares';

    
    

});

filtroSerie.addEventListener('click',async(e)=>{
    e.preventDefault();

    //Carga el genero de las series
    cargarGeneros('tv');

    // Obtiene los resultados de las series
    const resultados = await fetchPopulares('tv');
    // Carga la series en el DOM
    cargarTitulos(resultados);

    filtroPelicula.classList.remove('btn--active');
    filtroSerie.classList.add('btn--active');
    document.querySelector('#populares .main__titulo').innerText = 'Series Populares';
    

});

