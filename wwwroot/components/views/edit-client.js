'use strict';
import html from './edit-client.html';

export class Component_EditClient extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }

    setContainerGenerator(generator) {
        this.root.getElementById('list-add-containers-on-client').appendChild(generator);
    }
    addLanguageButton(button) {
        this.root.getElementById('list-add-languages-on-client').appendChild(button);
    }    
    setClientForm(form) {
        this.root.insertBefore(form, this.root.getElementById('hook-form'));
    }
    setClientCard(card) {
        this.root.insertBefore(card, this.root.getElementById('hook-card'));  
    }
}

customElements.define('component-edit-client', Component_EditClient);