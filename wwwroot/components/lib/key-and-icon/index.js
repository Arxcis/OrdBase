'use strict';
import html from './template.html';


export class Ordbase_KeyAndIcon extends HTMLElement { 
    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }

    set languageKey(key) { 
        this.root.querySelector('span').innerHTML = key; 
    }
    
    set icon(iconClass)  {  
        this.root.querySelector('i.fa').classList.toggle(iconClass); 
    }
}
customElements.define('ordbase-key-and-icon', Ordbase_KeyAndIcon);