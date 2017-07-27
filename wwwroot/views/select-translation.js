'use strict';
import html from './select-translation.html';

export class View_SelectTranslation extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;

        this.selectedButton = null;
        this.switchButtonHandler = (button) => console.log('default: ', button);
    }

    clearTranslationCards() {
        this.root.querySelector('#list-translations-on-client').innerHTML = '';   
    }

    addTranslationCard (card)   {   
        this.root.querySelector('#list-translations-on-client').appendChild(card);   
    }    

    setContainerButtonAll(button) {
        this.selectedButton = button;

        button.onclick =  (e) => {
            this.switchButtonHandler(button, this.selectedButton);
        };
        this.root.getElementById('section-containers-on-client')
                 .insertBefore(button, this.root.getElementById('list-containers-on-client'));                
    }

    addContainerButton (button) {       
        button.onclick =  (e) => {
            this.switchButtonHandler(button, this.selectedButton);
        };

        this.root.querySelector('#list-containers-on-client').appendChild(button);        
    }
}
customElements.define('view-select-translation', View_SelectTranslation);