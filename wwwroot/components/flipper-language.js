'use strict';

import  html  from './flipper-language.html';

const UP = 38;
const DOWN = 40;

export class Component_LanguageFlipper extends HTMLElement { 
  
    constructor() {
        super();
        this._root = this.createShadowRoot();
        this._root.innerHTML = html;
        this._buttonTemplate = this._root.getElementById('template-button');

        this._divUp   = this._root.getElementById('div-up');
        this._divDown = this._root.getElementById('div-down');

        //
        // Naviagte
        //
        this.addEventListener('keydown', e => {
            if (e.keyCode == UP) {
                let activeElement = this._root.activeElement;
                if (activeElement.previousElementSibling != null){
                    activeElement.previousElementSibling.focus();
                    
                }
            }
            else if (e.keyCode == DOWN) {

                let activeElement = this.root._activeElement;
                if (activeElement.nextElementSibling != null){
                    activeElement.nextElementSibling.focus();
                }
            } 
        }); 
    }
    makeNewItem({key, text, selected}){

        let fragment = this._buttonTemplate.content.cloneNode(true);
        let button   = fragment.querySelector('button');
        button.setAttribute('id', key);
        button.innerHTML = text;

        if (selected) {
            button.classList.add('selected');
            this._divUp.appendChild(button);
        }
        else {
            this._divDown.appendChild(button);
        }

        button.addEventListener('click', e => {

            if (button.parentElement.id === 'div-down') {
                button.classList.add('selected');
                
                this._divDown.removeChild(button);
                this._divUp.appendChild(button);
            } 
            else if (button.parentElement.id === 'div-up') {
                button.classList.remove('selected');                
                this._divUp.removeChild(button);
                this._divDown.appendChild(button);
            }

            button.focus();
        })
    }

    setHeaderUp(text)   { 
        this._root.getElementById('div-up-header').innerHTML = text;
    }
    
    setHeaderDown(text) { 
        this._root.getElementById('div-down-header').innerHTML = text;
    }

    getLanguageKeyArray() {
        return [].slice.call(this._divUp.children).map(button => {
            return button.getAttribute('id');
        });
    }
}
customElements.define('component-flipper-language', Component_LanguageFlipper);
