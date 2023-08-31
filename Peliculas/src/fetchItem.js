const fetchItem = async(id)=>{
    const tipo = document.querySelector('.main__filtros .btn--active').id;

    try{
        const url = `https://api.themoviedb.org/3/${tipo}/${id}?api_key=7926df5af6c5704899cabca04b3ef5b3&language=es-ES`;

        const resp = await fetch(url);
        const datos = await resp.json();

        return datos;
        

    } catch(e){
        console.log(e);
    }
    
};

export default fetchItem;