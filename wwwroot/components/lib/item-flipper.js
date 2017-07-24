'use strict';
import  html  from './item-flipper.html';

export class Component_ItemFlipper extends HTMLElement { 
  
    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;

        this.div_flipUp   = this.root.getElementById('flip-up');
        this.div_flipDown = this.root.getElementById('flip-down');
    }

    addItem(item) {
        this.div_flipDown.appendChild(item);

        item.addEventListener('click', e => {
            this.flipItem(e.target)
        });
    }

    flipItem(item) {
        const classList = item.classList;

        if (item.parentElement.id === 'flip-down') {

            this.div_flipDown.removeChild(item);
            this.div_flipUp.appendChild(item);
        } 
        else if (item.parentElement.id === 'flip-up') {

            this.div_flipUp.removeChild(item);
            this.div_flipDown.appendChild(item);
        }

        item.focus();
    }


    setHeaderUp(text)   { 
        this.root.getElementById('header-flip-up').innerHTML = text;
    }
    setHeaderDown(text) { 
        this.root.getElementById('header-flip-down').innerHTML = text;
    }
}
customElements.define('component-item-flipper', Component_ItemFlipper);
