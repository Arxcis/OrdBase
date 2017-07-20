'use strict';
import html from './template.html';

export class Ordbase_ItemGenerator extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;

        this.input = this.root.querySelector('input');
        this.button = this.root.querySelector('button');
        this.faIcon = this.button.querySelector('i');


        this.button.onclick = event => { 
            console.log(this.button, this.faIcon);
            this.button.classList.toggle('cancel');
            this.faIcon.classList.toggle('fa-plus');
            this.faIcon.classList.toggle('fa-times'); 
            
            if(this.input.style.display === 'block')
                this.input.style.display = 'none';
            else
                this.input.style.display = 'block';
        }
    }


    set heading(text) { this.root.querySelector('h2').innerHTML = text;}    
    set onInputEnter(handler) {
        
        this.input.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                console.log('heeglkjkldfjgløkdfjgløkdfjg');
            }
        });
    }

    appendItem(item) { 

    }
}

customElements.define('ordbase-item-generator', Ordbase_ItemGenerator);