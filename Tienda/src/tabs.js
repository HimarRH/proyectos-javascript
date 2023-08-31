export default class Tabs {

    constructor(idElemento){
        this.tabs = document.getElementById(idElemento);
        this.nav = this.tabs.querySelector('.tabs');
        
        // Comprobación de que el elemento clickado tiene la clase 'tabs__button
        this.nav.addEventListener('click',(e)=>{
            if([...e.target.classList].includes('tabs__button')){
                //Obtenemos  la tab que hay que mostrar
                const tab = e.target.dataset.tab;

                // Quitas la clase activa de otras tabs
                if(this.tabs.querySelector('.tab--active')){
                    this.tabs.querySelector('.tab--active').classList.remove('tab--active');
                }

                //Quitas la clase activa de los otros botones
                if(this.tabs.querySelector('.tabs__button--active')){
                    this.tabs.querySelector('.tabs__button--active').classList.remove('tabs__button--active');
                }

                
                //Agregamos la clase activa al nav
                this.tabs.querySelector(`#${tab}`).classList.add('tab--active')

                //Agregamos la clase activa al boton
                e.target.classList.add('tabs__button--active')
            }
        })
    }

}