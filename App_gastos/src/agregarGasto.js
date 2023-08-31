import { v4 as uuidv4 } from 'uuid';
import { cerrarFormulario } from './eventoBtnFormularioGasto';
import cargarGastos from './cargarGastos';
import cargarTotal from './cargarTotal';

const formulario = document.querySelector('#formulario-gasto form');
const descripcion = formulario.descripcion;
const precio = formulario.precio;
const expRegDescripcion = /^[a-zA-Z0-9\_\- ]{4,30}$/;
const expRegPrecio = /^\d+(\.\d+)?$/;

const comprobarDescripcion = ()=>{//Comprueba que la descripción del gasto es correcta
    if(!expRegDescripcion.test(descripcion.value)){
        descripcion.classList.add('formulario-gasto__input--error');
        formulario.descripcion.parentElement.querySelector('.formulario-gasto__leyenda').classList.add('formulario-gasto__leyenda--active');

        return false;
    }else {
        descripcion.classList.remove('formulario-gasto__input--error');
        formulario.descripcion.parentElement.querySelector('.formulario-gasto__leyenda').classList.remove('formulario-gasto__leyenda--active');
        return true;
    };   

};

const comprobarPrecio = ()=>{//Comprueba que el precio es correcto
    if(!expRegPrecio.test(precio.value)){//Si los datos no coinciden con la Exp. Regular activa la clase de error y activa el texto informativo
        precio.classList.add('formulario-gasto__input--error');
        formulario.precio.parentElement.querySelector('.formulario-gasto__leyenda').classList.add('formulario-gasto__leyenda--active');

        return false;
    }else {// Si los datos introducidos son correctos elimina la clase error y el texto informativo
        precio.classList.remove('formulario-gasto__input--error');
        formulario.precio.parentElement.querySelector('.formulario-gasto__leyenda').classList.remove('formulario-gasto__leyenda--active');
        return true;
    };   

};

// Validación del focus
descripcion.addEventListener('blur',()=> comprobarDescripcion());
//Validación al dejar de escribir
descripcion.addEventListener('keyup',(e)=> {
    
    if([...e.target.classList].includes('formulario-gasto__input--error')){
        comprobarDescripcion();
    }
    
    
});


// Validación del focus
precio.addEventListener('blur',()=> comprobarPrecio());
//Validación al dejar de escribir
precio.addEventListener('keyup',(e)=> {
    
    if([...e.target.classList].includes('formulario-gasto__input--error')){
        comprobarPrecio();
    }
    
    
});

formulario.addEventListener('submit', (e)=>{// Añade un nuevo gasto
    e.preventDefault();

    //Obtenemos el modo al que se accede al formulario
    const modo = formulario.closest('#formulario-gasto')?.dataset?.modo;

    

    if(comprobarDescripcion() && comprobarPrecio()){//Comprobación antes de añadir el nuevo gasto

        const nuevoGasto = {//Creación del objeto para el nuevo gasto
            id: uuidv4(),
            fecha: new Date(),
            descripcion: descripcion.value,
            precio: precio.value
        };
        

        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));

        if(modo === 'agregarGasto'){
            if(gastosGuardados){
                // Crear lista con nuevos gastos
                const nuevosGastos = [...gastosGuardados, nuevoGasto];
                window.localStorage.setItem('gastos',JSON.stringify(nuevosGastos));
            } else {
                //Agregar el primer gasto
                window.localStorage.setItem('gastos',JSON.stringify([{...nuevoGasto}]));
            }
        } else if (modo === 'editarGasto'){

            //Obtiene el id del gasto a editar
            const id = document.querySelector('#formulario-gasto').dataset?.id;
            //Obtener los valores del formulario
           
            // Obtener el index del gasto a editar
            let indexGastoEditar;
            if(id && gastosGuardados){
                gastosGuardados.forEach((gasto, index)=>{
                    if(gasto.id=== id){
                        indexGastoEditar = index;
                    }
                });

            }
            //Hacer una copia de los gastos guardados para poder editarla
            const nuevosGastos = [...gastosGuardados];

            nuevosGastos[indexGastoEditar]={
                ...gastosGuardados[indexGastoEditar],
                descripcion: descripcion.value,
                precio: precio.value,
            }
            // Reemplazamos la actual copia por los valores antiguos en Local Storage
            window.localStorage.setItem('gastos', JSON.stringify(nuevosGastos));

        }

        

        //Restablece los campos a cero tras agregar un nuevo gasto
        descripcion.value ='';
        precio.value ='';
        
        //Actualiza primero la lista de gastos
        cargarGastos();

        //Actualiza el total gastado
        cargarTotal();
        
        //Cierra el formulario tras añadr un nuevo gasto
        cerrarFormulario();
        
    }

});

