const fecthGeneros = async(filtro ='movie')=>{
    const tipo = filtro === 'movie' ? 'movie': 'tv';
    const url = `https://api.themoviedb.org/3/genre/${tipo}/list?api_key=7926df5af6c5704899cabca04b3ef5b3&language=es-ES`;

    try {
        const resp = await fetch(url);
        const datos = await resp.json();
        return datos.genres;

    }catch (e){
        console.log(e);
    }
};

export default fecthGeneros;