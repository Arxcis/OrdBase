'use strict';
import html from './edit-translation.html';


export class Component_EditTranslation extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }
}
customElements.define('component-edit-translation', Component_EditTranslation);