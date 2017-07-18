'use strict';
import html from './template.html';


export class OrdbaseEditClient extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }

    createButtonContainer() {
        return document.createElement('button-container');
    }

    appendButtonContainer(button) {
        this.root.querySelector('#list-show-containers-on-client');
    }
}

customElements.define('ordbase-edit-client', OrdbaseEditClient);