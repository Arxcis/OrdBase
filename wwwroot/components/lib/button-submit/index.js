'use strict';
import html from './template.html';



export class Ordbase_ButtonSubmit extends HTMLElement {
    constructor(){
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }
}