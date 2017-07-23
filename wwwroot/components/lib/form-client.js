'use strict';
import html from './form-client.html';

export class Ordbase_FormClient extends HTMLElement {
    
    constructor(){
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }
}

customElements.define('ordbase-form-client', Ordbase_FormClient);
