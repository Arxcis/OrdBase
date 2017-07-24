'use strict';
import html from './form-client.html';

export class Component_FormClient extends HTMLElement {
    
    constructor(){
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }

    getName()        { this.root.getElementById('form-client-name').value; }
    getWebpageUrl()  { this.root.getElementById('form-client-webpage').value; }
    getThumbnailUrl(){ this.root.getElementById('form-client-thumbnail').value; }
    getApiKey()      { this.root.getElementById('form-client-apikey').value; }
}

customElements.define('component-form-client', Component_FormClient);
