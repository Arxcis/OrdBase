'use strict';
import html from './button-select.html';

export class Component_ButtonSelect extends HTMLElement { 
    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;

        this.button = this.root.querySelector('button');
        this.button.onclick = event => {
            event.target.classList.toggle('selected');
            this.blur();
        };            
    }

    set id (id) { 
        this.button.setAttribute('id', `container-btn-${id}`); 
    }

    set text (text)    { 
        this.button.innerHTML = text; 
    }

    set selected (selected) { 
        if (selected) 
            this.button.classList.add('selected');
        else          
            this.button.classList.remove('selected');           
    }

    get isSelected() {
        return this.button.classList.contains('selected');
    }
}
customElements.define('component-button-select', Component_ButtonSelect);