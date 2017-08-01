'use strict';
import html from './card-translation.html';

export class Component_TranslationCard extends HTMLElement { 
    constructor() {
        super();
        this._root = this.createShadowRoot();
        this._root.innerHTML = html;

        this._button   = this._root.querySelector('button');
        this._form     = this._root.querySelector('form');
        this.__template__languageKeyComplete = this._root.getElementById('template-languagekey-complete');
        this.__template__fieldset            = this._root.getElementById('template-fieldset');

        this._languageArray = new Array;
        
        this._clickHandler  = () => console.log('default click....')
        this._submitHandler = () => console.log('default submit....');
        this._deleteHandler = () => console.log('default delete.....');
        this._openHandler   = () => console.log('default select.....');

        //
        // Enable animation
        //
        this._button.addEventListener('focus', () => {
            if(!this._button.classList.contains('animated'))
                this._button.classList.add('animated');
        })
        
        this._button.addEventListener('mouseover', () => {
            if(!this._button.classList.contains('animated'))           
                this._button.classList.add('animated');
        })  

        this._button.addEventListener('click', e => {  
            this._clickHandler(this, e);
        });
    }

    OnOpen(handler)    { this._openHandler   = handler };
    OnClose(handler)   { this._closeHandler  = handler; }
    OnDelete(handler)  { this._deleteHandler = handler; };
    OnSubmit(handler)  { this._submitHanlder = handler; }


    open()  {
        this.style.setProperty('--language-count', this.languageArray.length);  // Give data to the animation
        this._form.classList.add('active');                                      // Start the CSS animation 
        setTimeout(() => [].slice.apply(this._form.children).forEach(child => { child.style.display = 'block'; }), 150); // 
    }

    close() { 
        this._clickHandler = this._openHandler; 
    }

    setDeleteable(){ this._clickHandler = this._deleteHandler; }

    addFieldset(languageKey, isComplete) {

        this._languageArray.push(languageKey);

        let fragment = this.__template__fieldset.content.cloneNode(true);
        
        fragment.querySelector('label').setAttribute('for', `form-translation-${languageKey}`);  
        fragment.querySelector('label').innerHTML = languageKey;                                  
        fragment.querySelector('input').setAttribute('id',  `form-translation-${languageKey}`);
        
        this._form.appendChild(fragment);
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