'use strict';
import html from './form-client.html';

export class Component_FormClient extends HTMLElement {
    
    constructor(){
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }

    setSubmitText(text) {
        this.root.getElementById('button-submit').innerHTML = text;
    }


    getClient() {
        return {
            Name :         this.root.getElementById('form-client-name').value,
            WebpageUrl:    this.root.getElementById('form-client-webpage').value,
            ThumbnailUrl:  this.root.getElementById('form-client-thumbnail').value,
            ApiKey:        this.root.getElementById('form-client-apikey').value,
        }
    }
}

customElements.define('component-form-client', Component_FormClient);
