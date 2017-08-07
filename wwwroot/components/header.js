'use strict';
import html from './header.html';


export class Component_Header extends HTMLElement {

    constructor() {
        super();
        this._root = this.createShadowRoot();
        this._root.innerHTML = html;

    }

    flashMessage(message) {

        let errorBanner = this._root.getElementById('error-banner');

        if(!errorBanner.classList.contains('animated'))
            errorBanner.classList.add('animated');

        errorBanner.classList.add('active');
        errorBanner.innerHTML = message;

        setTimeout(() => {
            errorBanner.classList.remove('active');
            errorBanner.innerHTML = '';
                        
        }, 3000);
    }

    setIcons({ button0 = '',
               button1 = '',
               button2 = '' } = {}) {

        this._root.querySelector('#btn-header-right1 i.fa').setAttribute('class', `fa ${button1}`);
        this._root.querySelector('#btn-header-right2 i.fa').setAttribute('class', `fa ${button2}`);
    }

    
    setEventHandlers({ button1_onclick = e => console.log('default button1..'),
                       button2_onclick = e => console.log('default button2..'), } = {}){

        this._root.getElementById('btn-header-right1').addEventListener('click', button1_onclick); 
        this._root.getElementById('btn-header-right2').addEventListener('click', button2_onclick); 
    } 

    setTheme({textBig = 'nO THeme', textSmall='Ordbase', editable = false, selectable = false}){
        
        this._root.getElementById('btn-header-mid-small').innerHTML = textSmall;    
        this._root.getElementById('btn-header-mid-big').innerHTML   = textBig;    
    
        if (selectable) {
            this.classList.remove('editable');
            this.classList.add('selectable');
        
        } else if (editable) {
            this.classList.remove('selectable');
            this.classList.add('editable');
        }
    }
}
customElements.define('component-header', Component_Header);