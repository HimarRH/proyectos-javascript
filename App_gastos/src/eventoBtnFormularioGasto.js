const btn = document.getElementById('toggle-form-gasto');
const formularioGasto = document.getElementById('formulario-gasto');

const abrirFormulario = (modo = 'agregarGasto')=>{
    
    btn.classList.add('agregar-gasto__btn--active');
    formularioGasto.classList.add('formulario-gasto--active');

    if(modo==='editarGasto'){// Comprobamos que es el modo editar gasto
    document.querySelector('.formulario-gasto__titulo').innerText = 'Editar Gasto';//Editamos el título de formulario
    document.querySelector('.formulario-gasto__btn').innerText = 'Editar Gasto';//Editamos el botón
    document.querySelector('#formulario-gasto').dataset.modo = 'editarGasto';
    } else {
        document.querySelector('.formulario-gasto__titulo').innerText = 'Agregar Gasto';//Editamos el título de formulario
    document.querySelector('.formulario-gasto__btn').innerText = 'Agregar Gasto';//Editamos el botón
    document.querySelector('#formulario-gasto').dataset.modo = 'agregarGasto';
    document.querySelector('#descripcion').value = '';
    document.querySelector('#precio').value = '';

    }
};

const cerrarFormulario = ()=>{
    btn.classList.remove('agregar-gasto__btn--active');
    formularioGasto.classList.remove('formulario-gasto--active');
};

btn.addEventListener('click', (e)=>{
   if( [...formularioGasto.classList].includes('formulario-gasto--active')){
    cerrarFormulario();
   }else {
    abrirFormulario();
   }
    
});

export {cerrarFormulario, abrirFormulario};