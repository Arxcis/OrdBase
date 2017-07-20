'use strict';
import html from './template.html';

export class Ordbase_EditClient extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }

    appendButtonContainer(button) {
        this.root.querySelector('#list-show-containers-on-client').appendChild(button);
    }
}

customElements.define('ordbase-edit-client', Ordbase_EditClient);