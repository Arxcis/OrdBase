'use strict';
import html from './form-translation.html';

export class Ordbase_FormTranslation extends HTMLElement {
    
    constructor(){
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }
}

customElements.define('ordbase-form-translation', Ordbase_FormTranslation);
