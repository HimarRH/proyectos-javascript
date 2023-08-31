import isThisMonth from 'date-fns/isThisMonth';//Importa la fecha actual del mes. Servirá para verificar que soolo se muestren  los gastos del mes en curso.
import parseISO from 'date-fns/parseISO';//Cambia el string de la fecha a un formato fecha


const cargarTotal = ()=>{
    const contenedor = document.querySelector('#total-gastado');//accede al contendor donde irá el total

    const gastos = JSON.parse(window.localStorage.getItem('gastos'));//Cambia los datos recibidos a un Array de objetos
    let total = 0;
    const formatoMoneda = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    });//Da el formato de moneda que deseamos

    if(gastos){//Comprobamos si hay gastos
        const gastosMes = gastos.filter((gasto)=>{//Filtramos los gastos del mes en curso
            if(isThisMonth(parseISO(gasto.fecha))){
                return gasto;
            };            
            
        }); 
        if(gastosMes){//Comprobamos si hay gastos del mes actual
            gastosMes.forEach((gasto) => {//Accedemos al precio de cada gasto y lo sumamos a la variable total
                total += parseFloat(gasto.precio);
                
            });
        }else{
            total = 0;
        }

        contenedor.innerText = formatoMoneda.format(total);//Intriducimos en el contenedor de gasto el gasto total
        
    };
    
};

export default cargarTotal;