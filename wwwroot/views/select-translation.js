'use strict';
import html from './select-translation.html';

export class View_SelectTranslation extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;

        this.activeContainerButton = null;
    }

    setActiveContainerButton(button) {
        this.activeContainerButton = button;
    }

    getActiveContainerButton() {
        return this.activeContainerButton;
    }

    addContainerButton (button) {       
        this.root.querySelector('#list-containers-on-client').appendChild(button);    
    }

    setTranslationGenerator(generator) {
        this.root.getElementById('section-translations-on-client').appendChild(generator);
    }

    getTranslationGenerator() {
        return this.root.querySelector('component-item-generator');
    }

}
customElements.define('view-select-translation', View_SelectTranslation);