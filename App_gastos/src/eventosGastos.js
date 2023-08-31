import cargarGastos from "./cargarGastos";
import cargarTotal from "./cargarTotal";
import { abrirFormulario } from "./eventoBtnFormularioGasto";

const contenedorGastos = document.querySelector('#gastos');
contenedorGastos.addEventListener('click', (e)=>{
    const gasto = e.target.closest('.gasto');

    //Comprueba que hace click en el gasto
    if(gasto){
        if(gasto.scrollLeft>0){//Detecta que el scroll está más allá del punto 0 para devolverlo a su posición
            gasto.querySelector('.gasto__info').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest',
            })
        
        }else {//Si está en posición 0 aparecen las nuevas opciones
            gasto.querySelector('.gasto__acciones').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest',
            })
        };
       
    };

    //Añadimos el evento en el boton de editar a través de su data-accion
    if(e.target.closest('[data-accion="editar-gasto"]')){
        
        // Obtener el id del gasto para editar
        const id = gasto.dataset.id;

        //Obtener los gastos guardados
        const gastosGuardados =JSON.parse(window.localStorage.getItem('gastos'));

        let precio = '';
        let descripcion = '';

        //Comprobar si hay gastos
        if (gastosGuardados && gastosGuardados.length > 0){
            gastosGuardados.forEach((gasto) => {
                if(gasto.id === id){
                    precio = gasto.precio;
                    descripcion = gasto.descripcion;
                }
                
            });
            // Le ponemos este precio y descripción a los inputs del formulario
            document.querySelector('#formulario-gasto #descripcion').value = descripcion;
            document.querySelector('#formulario-gasto #precio').value = precio;
            document.querySelector('#formulario-gasto').dataset.id = id;
            abrirFormulario('editarGasto');
        }
        
    }

    //Botón de eliminar gasto
    if(e.target.closest('[data-accion="eliminar-gasto"]')){
        const id = gasto.dataset.id;// Obtenemos el id del gasto que queremos borrar

        //Accedemos a los datos guardados
        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));

        if(gastosGuardados){//Nos aseguramos de que existen gastos

            //Utilizamos filter para modificar el array y borrar el que queríamos.
            const nuevosGastos = gastosGuardados.filter((gasto)=>{
                if(gasto.id !==id){// Solo retornamos todos aquellos que son diferentes de id
                    return gasto;
                }
                
            });

            window.localStorage.setItem('gastos', JSON.stringify(nuevosGastos));
        }
        //Volvemos a cargar los gastos para actualizar la APP
        cargarGastos();

        //Volvemos a cargar el total gastado
        cargarTotal();

    }
});