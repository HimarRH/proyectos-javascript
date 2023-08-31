import fecthGeneros from "./fetchGeneros";
import obtenerGenero from "./obtenerGenero";

const fetchBusqueda = async(pagina=1 )=>{
    const tipo = document.querySelector('.main__filtros .btn--active')?.id;
    const idGenero = document.querySelector('#filtro-generos .btn--active ')?.dataset.id;
    
    const ageInicial = document.getElementById('años-min').value || 1950;
    const ageFin = document.getElementById('años-max').value || 2023;

    let url;

    if (tipo === 'movie'){
        url = `https://api.themoviedb.org/3/discover/movie?api_key=7926df5af6c5704899cabca04b3ef5b3&include_adult=false&include_video=false&language=es-ES&page=${pagina}&primary_release_date.gte=${ageInicial}&primary_release_date.lte=${ageFin}&region=ES&sort_by=popularity.desc&with_genres=${idGenero}`;
    } else if (tipo==='tv'){
        url =`https://api.themoviedb.org/3/discover/tv?api_key=7926df5af6c5704899cabca04b3ef5b3&first_air_date.gte=${ageInicial}&first_air_date.lte=${ageFin}&include_adult=false&include_null_first_air_dates=false&language=es-ES&page=${pagina}&sort_by=popularity.desc&with_genres=${idGenero}`
    };

    try {
        const resp = await fetch(url);
        const data = await resp.json();
        const result = data.results;
        const generos = await fecthGeneros();


        result.forEach((resultado) => {
            resultado.genero = obtenerGenero(resultado.genre_ids[0],generos); 
        });

        return result;
    } catch (e){
        console.log(e);

    };

};

export default fetchBusqueda;