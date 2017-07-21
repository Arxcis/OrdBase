'use strict';
import html from './template.html';

export class Ordbase_ItemGenerator extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;

        this._input = this.root.querySelector('input');
        this.button = this.root.querySelector('button');
        this.faIcon = this.button.querySelector('i');


        this.button.onclick = event => { 

            console.log(this.button, this.faIcon);
            this.button.classList.toggle('cancel');
            this.faIcon.classList.toggle('fa-plus');
            this.faIcon.classList.toggle('fa-times'); 
            
            if(this._input.style.display === 'block')
                this._input.style.display = 'none';
            else
                this._input.style.display = 'block';

            this._input.focus();
        }
    }

    get input(){  return this._input;  }

    appendMenuItem(item) { 
        this.root.insertBefore(item, this._input);
    }
}

customElements.define('ordbase-item-generator', Ordbase_ItemGenerator);