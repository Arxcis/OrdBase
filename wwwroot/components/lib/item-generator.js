'use strict';
import html from './item-generator.html';

export class Component_ItemGenerator extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;

        this.input  = this.root.querySelector('input');
        this.button = this.root.querySelector('button');
        this.faIcon = this.button.querySelector('i');

        this.button.addEventListener('click',  event => { 

            console.log(this.button, this.faIcon);
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

        this.input.addEventListener('focusout', () => {
            this.input.style.display = 'none';
            this.button.classList.remove('cancel');
            this.faIcon.classList.add('fa-plus');
            this.faIcon.classList.remove('fa-times');            
        });
    }

    getInput(){  
        return this.input;  
    }

    addItem(item) { 
        this.root.insertBefore(item, this.input);
    }
}

customElements.define('component-item-generator', Component_ItemGenerator);