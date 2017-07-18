'use strict';
import { generateShadowRoot } from '/jslib/Util.js';
import { html } from './template.html';

export class OrdbaseFieldsetTranslation extends HTMLElement {

    constructor() {
        super();
        this.root = generateShadowRoot.call(this, html);
    }
}
customElements.define('ordbase-fieldset-translation', OrdbaseFieldsetTranslation);