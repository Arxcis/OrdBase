'use strict';
import html from './template.html';

export class Ordbase_EditClient extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }

    appendMenuItem(item) {
        this.root.querySelector('#list-show-containers-on-client').appendChild(item);
    }

}

customElements.define('ordbase-edit-client', Ordbase_EditClient);