'use strict';
import html from './select-translation.html';

const UP = 38;
const DOWN = 40;

export class View_SelectTranslation extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;

        this.activeContainerButton = null;
        this.activeTranslationCard = null; 
        

        //
        // Navigation
        //
        this.addEventListener('keydown', e => {
            if (e.keyCode == UP) {
                let activeElement = this.root.activeElement;
                if (activeElement.previousElementSibling != null){
                    activeElement.previousElementSibling.focus();
                    
                }
            }
            else if (e.keyCode == DOWN) {
                let activeElement = this.root.activeElement;
                if (activeElement.nextElementSibling != null){
                    activeElement.nextElementSibling.focus();
                }
            } 
        }); 
    }

    setActiveContainerButton(button) { this.activeContainerButton = button; }
    setActiveTranslationCard(card) { this.activeTranslationCard = card; }

    getActiveContainerButton() { return this.activeContainerButton; }
    getActiveTranslationCard() { return this.activeTranslationCard; }

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