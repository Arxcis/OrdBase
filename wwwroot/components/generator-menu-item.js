'use strict';
import html from './generator-menu-item.html';

const UP    = 38;
const DOWN  = 40;
const ESC   = 27;
const ENTER = 13;
const TAB   = 9;
const BACKSPACE = 8;

export class Component_GeneratorMenuItem extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;

        this.activeItem = {};
        this.generatedItems = this.root.getElementById('div-generated-items');
        this.input  = this.root.querySelector('input');
        this.button = this.root.getElementById('button-generate');
        this.faIcon = this.button.querySelector('i');

        this.generateHandler  = (item) => { console.log('Default OnGenerate...') }

        //
        // Event click
        //
        this.button.addEventListener('click',  e => { 

            if (this.input.style.display === 'block') {
                this.deactivateInput();

                if(this.input.value != ''){
                    this.input.value = '';
                }
            }
            else {
                this.activateInput();                
            }
        });


        //
        // Navigate up and down component-items with arrow keys
        //
        this.addEventListener('keydown', e => {
            if (e.keyCode == UP) {
                let activeElement = this.root.activeElement;
                if (activeElement.parentElement == this.generatedItems && activeElement.previousElementSibling != null){
                    activeElement.previousElementSibling.focus();
                    
                }
            }
            else if (e.keyCode == DOWN) {

                let activeElement = this.root.activeElement;
                if (activeElement.parentElement == this.generatedItems && activeElement.nextElementSibling != null){
                    activeElement.nextElementSibling.focus();
                }
            } 
        });
    }

    deactivateInput() {
        this.input.style.display = 'none';
        this.button.classList.remove('cancel');
        this.faIcon.classList.remove('fa-times');                 
        this.faIcon.classList.add('fa-plus');

        this.button.focus();
    }

    activateInput() {
        this.input.style.display = 'block';
        
        this.faIcon.classList.remove('fa-plus');
        this.faIcon.classList.add('fa-times'); 
        this.button.classList.add('cancel');   
        
        this.input.focus();
    }

    OnGenerate(handler) {
        this.generateHandler = handler;

        this.input.addEventListener('keydown', e => {
            if (e.keyCode === ENTER) {

                if(this.input.value != '') {
                    this.generateHandler.apply(this, e);
                    this.input.value = '';
                }
            }
            else if (e.keyCode === ESC) {
                this.deactivateInput();
            }
        });
    }
        
    setInputValue(_value) {
        this.input.value = _value;
    }

    getValue() {
        return this.input.value;
    }
    getItemArray() {
            return [].slice.apply(this.root.getElementById('div-generated-items').children);
    }

    getActiveItem() {
        return this.activeItem;
    }

    setActiveItem(item) {
        this.activeItem = item; 
    }

    setButtonHeight(height) {
        this.button.style.height = `${height}px`;
        this.input.style.height  = `${height-10}px`
    }



    addItem(item) {
        item.classList.add('generated')
        this.root.getElementById('div-generated-items').appendChild(item);
    }

    removeItem(item) {
        this.root.getElementById('div-generated-items').removeChild(item);
        this.deactivateInput();
    }

    clearItems() {
        this.root.getElementById('div-generated-items').innerHTML = '';
    }

    activate()   { this.button.style.display = 'block'; }
    deactivate() { this.button.style.display  = 'none'; }
}

customElements.define('component-generator-menu-item', Component_GeneratorMenuItem);