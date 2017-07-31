'use strict';

import  html  from './item-flipper.html';
import { force } from '../lib/Util.js';

const UP = 38;
const DOWN = 40;

export class Component_FlipperMenuItem extends HTMLElement { 
  
    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;

        this.div_flipUp   = this.root.getElementById('flip-up');
        this.div_flipDown = this.root.getElementById('flip-down');


        this.addEventListener('keydown', e => {
            if (e.keyCode == UP) {
                let activeElement = this.root.activeElement;
                if (activeElement.previousElementSibling != null){
                    activeElement.previousElementSibling.focus();
                    
                }
            }
            else if (e.keyCode == DOWN) {

                let activeElement = this.root.activeElement;
                if (activeElement.nextElementSibling != null){
                    activeElement.nextElementSibling.focus();
                }
            } 
        }); 
    }

    addItem(item, options = force()) {
        
        (arguments[1].selected) ? this.div_flipUp.appendChild(item):
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

    getSelectedItemArray() {
        return [].slice.call(this.div_flipUp.children);
    }
}
customElements.define('component-flipper-menu-item', Component_FlipperMenuItem);
