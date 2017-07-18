'use strict';
import { html } from './template.html';


export class OrdbaseButtonSubmit extends HTMLElement {
    constructor(){
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }
}