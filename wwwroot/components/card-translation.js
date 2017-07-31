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

        this.clickHandler  = () => console.log('default...');
        this.deleteHandler = () => console.log('default.....');
        this.selectHandler = () => console.log('default.....');

        this.button.addEventListener('click', () => {  
            this.clickHandler(); 

            if (!this.form.classList.contains('animated') && this.languageArray.length > 0) {
                this.OnFirstClick();
            }
            this.OnEveryClick();
        });
    }

    OnEveryClick () {
        this.form.classList.toggle('active');

        if(this.form.classList.contains('active')) {
            setTimeout(() => [].slice.apply(this.form.children).forEach(child => {child.style.display = 'block'; }), 130);
        }
        else {
            [].slice.apply(this.form.children).forEach(child => {child.style.display = 'none'; });
        }
    }

    OnFirstClick () {
        this.form.classList.add('animated');
        console.log( this.style);
        this.style.setProperty('--language-count', this.languageArray.length);

        this.languageArray.forEach(languageKey => {

            let fragment = this.__template__fieldset.content.cloneNode(true);

            fragment.querySelector('label').setAttribute('for', `form-translation-${languageKey}`);  
            fragment.querySelector('label').innerHTML = languageKey;                                  
            fragment.querySelector('input').setAttribute('id',  `form-translation-${languageKey}`);
            this.form.appendChild(fragment);
        });
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
            this.clickHandler = this.selectHandler;
        }
    }

    isDeleteable() {
        return this.button.classList.contains('deleteable');
    }
}
customElements.define('component-card-translation', Component_TranslationCard);