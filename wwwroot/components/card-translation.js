'use strict';
import html from './card-translation.html';


export class Component_TranslationCard extends HTMLElement { 
    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }
    
    set key (key)            { this.root.querySelector('span').innerHTML = key;  }
    set onClickCard(handler) { this.root.querySelector('button').onclick = handler; }

    makeLanguageKeyAndIcon(languageKey, isComplete) { 
        let languageElement = document.createElement('div');
        let isCompleteIcon  = document.createElement('i');

        languageElement.innerHTML = languageKey;
        isCompleteIcon.classList.add('fa');
       
        if (isComplete) {
            isCompleteIcon.classList.add('fa-check');
        }
        else {
            isCompleteIcon.classList.add('fa-times');
        }

        this.root.getElementById('div-languages-complete').appendChild(languageElement);
        this.root.getElementById('div-languages-complete').appendChild(isCompleteIcon);  
    }
}
customElements.define('component-card-translation', Component_TranslationCard);