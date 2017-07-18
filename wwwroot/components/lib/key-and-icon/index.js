'use strict';
import { generateShadowRoot } from '/jslib/Util.js';
import { html } from './template.html';

export class OrdbaseKeyAndIcon extends HTMLElement { 
    constructor() {
        super();
        this.root = generateShadowRoot.call(this, html);
    }

    set languageKey(key) { 
        this.root.querySelector('span').innerHTML = key; 
    }
    
    set icon(iconClass)  {  
        this.root.querySelector('i.fa').classList.toggle(iconClass); 
    }
}
customElements.define('ordbase-key-and-icon', OrdbaseKeyAndIcon);