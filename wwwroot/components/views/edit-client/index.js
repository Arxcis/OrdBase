'use strict';
import html from './template.html';

export class Ordbase_EditClient extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }

    appendMenuItem(element) {
        this.root.getElementById('list-add-containers-on-client').appendChild(element);
    }

    appendLanguageButton(element) {
        this.root.getElementById('list-add-languages-on-client').appendChild(element);
    } 

    appendButtonSubmit(button) {
        this.root.querySelector('form').appendChild(button);
    }

}

customElements.define('ordbase-edit-client', Ordbase_EditClient);