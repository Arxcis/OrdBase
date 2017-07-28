'use strict';
import html from './item-generator.html';

const ESC   = 27;
const ENTER = 13;
const TAB   = 9;

export class Component_ItemGenerator extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;

        this.input  = this.root.querySelector('input');
        this.button = this.root.getElementById('button-generate');
        this.faIcon = this.button.querySelector('i');

        this.generateHandler  = (item) => { console.log('Default OnGenerate...') }

        //
        // Event click
        //
        this.button.addEventListener('click',  e => { 

            this.button.classList.toggle('cancel');
            this.faIcon.classList.toggle('fa-plus');
            this.faIcon.classList.toggle('fa-times'); 
            
            if(this.input.style.display === 'block')
                this.input.style.display = 'none';
            else {
                this.input.style.display = 'block';
                this.input.focus();
            }
        });

        //
        // Event focusout
        //
        this.input.addEventListener('focusout', e => {
            
            if(this.input.value != '') {
                this.generateHandler(this, e);
                this.input.value = '';
            }

            this.input.style.display = 'none';
            this.button.classList.remove('cancel');
            this.faIcon.classList.add('fa-plus');
            this.faIcon.classList.remove('fa-times');            
        });

    }

    OnGenerate(handler) {
        this.generateHandler = handler;

        this.input.addEventListener('keydown', e => {
            if (e.keyCode === ENTER) {
                this.generateHandler.apply(this, e);
            }
        });
    }
        
    setInputValue(_value) {
        this.input.value = _value;
    }

    getValue() {
        return this.input.value;
    }

    setButtonHeight(height) {
        this.button.style.height = `${height}px`;
        this.input.style.height  = `${height-10}px`
    }

    getItemArray() {
        return [].slice.apply(this.root.getElementById('div-generated-items').children);
    }

    addItem(item) {
        item.classList.add('generated')
        this.root.getElementById('div-generated-items').appendChild(item);
    }

    removeItem(item) {
        this.root.getElementById('div-generated-items').removeChild(item);
    }

    clearItems() {
        this.root.getElementById('div-generated-items').innerHTML = '';
    }

    activate()   { this.button.style.display = 'block'; }
    deactivate() { this.button.style.display  = 'none'; }
}

customElements.define('component-item-generator', Component_ItemGenerator);