'use strict';
import html from './template.html';


export class Ordbase_Header extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
        console.log(this.root);   
    }

    set textBig(text)          { this.root.querySelector('#btn-header-mid-big').innerHTML   =  text;    }  
    set textSmall(text)        { this.root.querySelector('#btn-header-mid-small').innerHTML =  text;    }
    set buttonIconLeft(icon)   { this.root.querySelector('#btn-header-left i.fa').setAttribute('class',   `fa ${icon}`); }
    set buttonIconRight1(icon) { this.root.querySelector('#btn-header-right1 i.fa').setAttribute('class', `fa ${icon}`); } 
    set buttonIconRight2(icon) { this.root.querySelector('#btn-header-right2 i.fa').setAttribute('class', `fa ${icon}`); }   
    
    set onClickButtonLeft   (handler) { this.root.querySelector('#btn-header-left').onclick   = handler; };
    set onClickButtonRight1 (handler) { this.root.querySelector('#btn-header-right1').onclick = handler; };
    set onClickButtonRight2 (handler) { this.root.querySelector('#btn-header-right2').onclick = handler; };
}
customElements.define('ordbase-header', OrdbaseHeader);