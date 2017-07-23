'use strict';
import html from './select-translation.html';

export class Component_SelectTranslation extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }

    appendButtonContainer (btn) {   this.root.querySelector('#list-show-containers-on-client').appendChild(btn);  }
    appendCardTranslation (card) {  this.root.querySelector('#list-show-translations-on-client').appendChild(card); }
}
customElements.define('component-select-translation', Component_SelectTranslation);