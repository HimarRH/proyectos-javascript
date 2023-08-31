import fecthGeneros from "./fetchGeneros";
import obtenerGenero from "./obtenerGenero";

const  fetchPopulares = async(filtro = 'movie')=>{
    const tipo = filtro === 'movie' ? 'movie': 'tv';
    const url = `https://api.themoviedb.org/3/${tipo}/popular?api_key=7926df5af6c5704899cabca04b3ef5b3&language=es-ES&page=1&region=US`;

    try {
        const resp = await fetch(url);
        const datos = await resp.json();
        const resultados = datos.results;
        
        const generos = await fecthGeneros();

        resultados.forEach((resultado) => {
            resultado.genero = obtenerGenero(resultado.genre_ids[0],generos); 
        });

        return resultados;
    } catch(e){
        console.log(e);
    }

    
}

export default fetchPopulares;