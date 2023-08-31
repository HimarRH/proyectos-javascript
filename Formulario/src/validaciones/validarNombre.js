const formulario = document.getElementById('formulario');

const validarNombre = ()=>{
    //Acepta cualquier digito (0-9) y un punto con decimales(opcional)
    const expRegNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    
    const inputNombre = formulario['nombre-receptor'];

    if(expRegNombre.test(inputNombre.value)){

        inputNombre.classList.remove('formulario__input--error');
        return true;

    }else {
        inputNombre.classList.add('formulario__input--error');
        return false;
    }


}

export default validarNombre;