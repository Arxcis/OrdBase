'use strict';
import { html } from './template.html';

export class OrdbaseFieldsetTranslation extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }
}
customElements.define('ordbase-fieldset-translation', OrdbaseFieldsetTranslation);