'use strict';
import html from './template.html';


export class OrdbaseEditTranslation extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }
}
customElements.define('ordbase-edit-translation', OrdbaseEditTranslation);