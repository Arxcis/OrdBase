'use strict';
import html from './edit-client.html';

export class Ordbase_EditClient extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }

    get form () {
        return this.root.getElementById('form-edit-client');
    }

    appendItemMenu(element) {
        this.root.getElementById('list-add-containers-on-client').appendChild(element);
    }

    appendButtonLanguage(element) {
        this.root.getElementById('list-add-languages-on-client').appendChild(element);
    } 

    appendButtonSubmit(button) {
        this.form.appendChild(button);
    }
}

customElements.define('ordbase-edit-client', Ordbase_EditClient);