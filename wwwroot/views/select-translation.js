'use strict';
import html from './select-translation.html';

export class View_SelectTranslation extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;

        this.activeContainerButton = null;
        this.switchButtonHandler = (button) => console.log('default: ', button);
    }

    clearTranslationCards() {
        this.root.getElementById('list-translations-on-client').innerHTML = '';   
    }

    setContainerButtonAll(button) {
        this.activeContainerButton = button;

        button.onclick =  (e) => {
            
            let oldButton = this.activeContainerButton;
            this.activeContainerButton = button;
            this.switchButtonHandler(button, oldButton);
        };
        this.root.getElementById('section-containers-on-client')
                 .insertBefore(button, this.root.getElementById('list-containers-on-client'));                
    }

    setTranslationGenerator(generator) {
        this.root.getElementById('section-translations-on-client').appendChild(generator);
    }

    getTranslationGenerator() {
        return this.root.querySelector('component-item-generator');
    }

    addContainerButton (button) {       
        button.onclick =  (e) => {
            this.switchButtonHandler(button, this.activeContainerButton);
        };

        this.root.querySelector('#list-containers-on-client').appendChild(button);        
    }
}
customElements.define('view-select-translation', View_SelectTranslation);