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

    setIcons({ button0_icon = '',
               button1_icon = '',
               button2_icon = '',
               button3_icon = '',} = {}) {

        this._root.querySelector('#btn-header-left i.fa').setAttribute('class', `fa ${button0_icon}`); 
        this._root.querySelector('#btn-header-right0 i.fa').setAttribute('class', `fa ${button1_icon}`);
        this._root.querySelector('#btn-header-right1 i.fa').setAttribute('class', `fa ${button2_icon}`);
        this._root.querySelector('#btn-header-right2 i.fa').setAttribute('class', `fa ${button3_icon}`);
    }

    
    setEventHandlers({ button0_onclick = e => console.log('default button0..'), 
                       button1_onclick = e => console.log('default button1..'),
                       button2_onclick = e => console.log('default button2..'),
                       button3_onclick = e => console.log('default button3..') } = {}){
        
        this._root.getElementById('btn-header-left').addEventListener('click',   button0_onclick);
        this._root.getElementById('btn-header-right0').addEventListener('click', button1_onclick);
        this._root.getElementById('btn-header-right1').addEventListener('click', button2_onclick); 
        this._root.getElementById('btn-header-right2').addEventListener('click', button3_onclick); 
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