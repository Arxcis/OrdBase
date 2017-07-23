'use strict';
import html from './fieldset-translation.html';


export class Ordbase_FieldsetTranslation extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }
}
customElements.define('ordbase-fieldset-translation', Ordbase_FieldsetTranslation);