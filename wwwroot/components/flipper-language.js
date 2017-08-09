'use strict';

import  html  from './flipper-language.html';

const UP = 38;
const DOWN = 40;

let _getElementById = null;

export class Component_LanguageFlipper extends HTMLElement { 

        constructor() {
            super();
            this._root = this.createShadowRoot();        
            this._root.innerHTML = html;
            _getElementById = this._root.getElementById; // alias 
            
            this._buttonTemplate = _getElementById('template-button');
            this._divUp          = _getElementById('div-up');
            this._divDown        = _getElementById('div-down');

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

                    let activeElement = this._root.activeElement;
                    if (activeElement.nextElementSibling != null){
                        activeElement.nextElementSibling.focus();
                    }
                } 
            }); 
        }
    //
    // PUBLIC
    //
    makeItem({key, text, selected}){

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
                this._flipUp(button);
            } 
            else if (button.parentElement.id === 'div-up') {
                this._flipDown(button);
            }

            button.focus();
        })
    }

    selectItem(key) {
        this._flipUp(_getElementById(key));
    }

    setTextUp(text)   { 
        _getElementById('div-up-header').innerHTML = text;
    }
    
    setTextDown(text) { 
        _getElementById('div-down-header').innerHTML = text;
    }

    getLanguageKeyArray() {
        return [].slice.call(this._divUp.children).map(button => {
            return button.getAttribute('id');
        });
    }

    //
    // PRIVATE
    //


    _flipUp(item) {
        item.classList.add('selected');        
        this._divDown.removeChild(item);
        this._divUp.appendChild(item);
    }

    _flipDown(item) {
        item.classList.remove('selected');        
        this._divUp.removeChild(item);
        this._divDown.appendChild(item);
    }
    
}
customElements.define('component-flipper-language', Component_LanguageFlipper);
