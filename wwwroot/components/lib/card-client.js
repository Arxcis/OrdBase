'use strict';
import html from './card-client.html';



export class Ordbase_CardClient extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }

    set heading (name){
        this.root.querySelector('h2').innerHTML = name || '{{ null heading }}';
        this._name = name;
    }
    
    set text(text) {
        this.root.querySelector('p').innerHTML = text || '{{ null text }}';
    }

    set thumbnail (url) { 
        this.root.querySelector('img').src = url;
    }

    set buttonHandler(handler){
        this.root.querySelector('button').onclick =  handler;
    }

    connectedCallback() {
    }
}
customElements.define('ordbase-card-client', Ordbase_CardClient);