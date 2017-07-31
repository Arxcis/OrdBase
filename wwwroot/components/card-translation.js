'use strict';
import html from './card-translation.html';


export class Component_TranslationCard extends HTMLElement { 
    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;

        this.button   = this.root.querySelector('button');
        this.template = this.root.getElementById('template-languagekey-complete');

        this.clickHandler  = () => console.log('default...');
        this.deleteHandler = () => console.log('default.....');
        this.selectHandler = () => console.log('default.....');

        this.button.addEventListener('click', () => {  
            this.clickHandler(); 
            this.button.blur(); 
        });
    }

    setSelected(selected) { 
        if (selected) {
            this.button.classList.add('selected');
        }
        else {
            this.button.classList.remove('selected');  
        }         
    }
    
    setTranslationKey(key){ 
        this.root.querySelector('span').innerHTML = key;  
    }
    
    OnClick(handler) { 
        this.clickHandler = handler; 
    }

    addLanguagekeyComplete(languageKey, isComplete) { 

        let fragment = this.template.content.cloneNode(true);

        fragment.querySelector('span').innerHTML = languageKey;
        if (isComplete === true) {
            fragment.querySelector('i').classList.remove('fa-times');
            fragment.querySelector('i').classList.add('fa-check');
        }
        this.root.getElementById('array-languagekey-complete').appendChild(fragment);
    }


    toggleDeleteable() {
        this.button.classList.toggle('deleteable');
        
        if (this.isDeleteable()) {
            this.clickHandler = this.deleteHandler;
        }
        else {
            this.clickHandler = this.selectHandler;
        }
    }

    isDeleteable() {
        return this.button.classList.contains('deleteable');
    }
}
customElements.define('component-card-translation', Component_TranslationCard);