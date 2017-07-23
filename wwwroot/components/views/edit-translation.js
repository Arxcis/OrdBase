'use strict';
import html from './edit-translation.html';


export class Ordbase_EditTranslation extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }
}
customElements.define('ordbase-edit-translation', Ordbase_EditTranslation);