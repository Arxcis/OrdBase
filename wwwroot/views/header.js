'use strict';
import html from './header.html';


export class View_Header extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
        console.log(this.root);   
    }

    set textBig(text) { 
        this.root.getElementById('btn-header-mid-big')
                 .innerHTML = text;    
    }

    set textSmall(text) { 
        this.root.getElementById('btn-header-mid-small')
                 .innerHTML = text;    
    }

    set buttonIconLeft(icon) { 
        this.root.querySelector('#btn-header-left i.fa')
                 .setAttribute('class', `fa ${icon}`) 
    }

    set buttonIconRight1(icon) { 
        this.root.querySelector('#btn-header-right1 i.fa')
                 .setAttribute('class', `fa ${icon}`);
    }

    set buttonIconRight2(icon) { 
        this.root.querySelector('#btn-header-right2 i.fa')
                 .setAttribute('class', `fa ${icon}`);
    }

    get buttonLeft() { 
        return this.root.getElementById('btn-header-left');
    }

    get buttonRight1() { 
        return this.root.getElementById('btn-header-right1'); 
    }

    get buttonRight2() { 
        return this.root.getElementById('btn-header-right2'); 
    } 

}
customElements.define('view-header', View_Header);