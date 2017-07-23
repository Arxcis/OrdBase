'use strict';
import html from './form-client.html';

export class Component_FormClient extends HTMLElement {
    
    constructor(){
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }
}

customElements.define('component-form-client', Component_FormClient);
