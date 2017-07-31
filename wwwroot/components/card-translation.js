'use strict';
import html from './card-translation.html';


export class Component_TranslationCard extends HTMLElement { 
    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;

        this.button   = this.root.querySelector('button');
        this.form     = this.root.querySelector('form');
        this.__template__languageKeyComplete = this.root.getElementById('template-languagekey-complete');
        this.__template__fieldset            = this.root.getElementById('template-fieldset');

        this.languageArray = new Array;

        this.submitHandler = () => console.log('default submit...');
        this.deleteHandler = () => console.log('default delete.....');
        this.openHandler = () => console.log('default select.....');

        this.button.addEventListener('click', () => {  

            // If first time, add animation
            if (!this.form.classList.contains('animated')) {
                this.form.classList.add('animated');                
            }

            // Toggle between active and not active. Wait to enable active until displayForm() is fired
            if(!this.form.classList.contains('active')) {
                this.openHandler();
            }
            else {
                this.form.classList.remove('active');
                this.form.innerHTML = '';
            }
        });
    }

    OnOpen(handler) {
        this.openHandler = handler;
    };

    OnDelete(handler) {
        this.deleteHandler = handler;
    };

    OnSubmit(handler) {
        this.submitHanlder = handler;
    }

    addFieldset(languageKey, isComplete) {

        this.languageArray.push(languageKey);

        let fragment = this.__template__fieldset.content.cloneNode(true);
        
        fragment.querySelector('label').setAttribute('for', `form-translation-${languageKey}`);  
        fragment.querySelector('label').innerHTML = languageKey;                                  
        fragment.querySelector('input').setAttribute('id',  `form-translation-${languageKey}`);
        
        this.form.appendChild(fragment);
    }

    displayForm() {
        this.style.setProperty('--language-count', this.languageArray.length);  // Give data to the animation
        this.form.classList.add('active');                                      // Start the animation 
        setTimeout(() => [].slice.apply(this.form.children).forEach(child => { child.style.display = 'block'; }), 150); // Let the animation finish before displaying children       
    }


    OnFirstClick () {
    }

    focus() { this.button.focus(); }

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
    

    addLanguagekeyComplete(languageKey, isComplete) { 

        let fragment = this.__template__languageKeyComplete.content.cloneNode(true);

        this.languageArray.push(languageKey);

        fragment.querySelector('span').innerHTML = languageKey;
        if (isComplete === true) {
            fragment.querySelector('i').classList.remove('fa-times');
            fragment.querySelector('i').classList.add('fa-check');
        }
        this.root.getElementById('array-languagekey-complete').appendChild(fragment);
    }

    OnClick(handler) { 
        this.clickHandler = handler; 
    }

    toggleDeleteable() {
        this.button.classList.toggle('deleteable');
        
        if (this.isDeleteable()) {
            this.clickHandler = this.deleteHandler;
        }
        else {
            this.clickHandler = this.openHandler;
        }
    }

    isDeleteable() {
        return this.button.classList.contains('deleteable');
    }
}
customElements.define('component-card-translation', Component_TranslationCard);