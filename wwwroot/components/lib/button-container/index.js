'use strict';
import { generateShadowRoot } from '/jslib/Util.js';
import { html } from './template.html';

export class OrdbaseButtonContainer extends HTMLElement { 
    constructor() {
        super();
        this.root = generateShadowRoot.call(this, html);

        this.button = this.root.querySelector('button');
        this.button.onclick = event => event.target.classList.toggle('selected');            
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
}
customElements.define('ordbase-button-container', OrdbaseButtonContainer);