import data from './fotos';
const {fotos}=data;

export default {
    categorias : [
        {
            id:'america',
            nombre:'América',
            numeroFotos: fotos.america.length,
            imagenPortada:'./img/america.jpg',
        },
        {
            id:'europa',
            nombre:'Europa',
            numeroFotos: fotos.europa.length,
            imagenPortada:'./img/europa.jpg',
        },
        {
            id:'africa',
            nombre:'África',
            numeroFotos: fotos.africa.length,
            imagenPortada:'./img/africa.jpg',
        },
        {
            id:'asia',
            nombre:'Asica',
            numeroFotos: fotos.asia.length,
            imagenPortada:'./img/asia.jpg',
        },
        {
            id:'oceania',
            nombre:'Oceanía',
            numeroFotos: fotos.oceania.length,
            imagenPortada:'./img/oceania.jpg',
        },
        {
            id:'antartida',
            nombre:'Antártida',
            numeroFotos: fotos.antartida.length,
            imagenPortada:'./img/antartida.jpg',
        },
    ],
};