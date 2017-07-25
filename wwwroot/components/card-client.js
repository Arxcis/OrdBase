'use strict';
import html from './card-client.html';



export class Component_CardClient extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
        this.button = this.root.querySelector('button');
    }

    setHeading (name){
        this.root.getElementById('card-h2')
                 .innerHTML = name || '{{ null heading }}';
        this._name = name;
    }
    
    setId(id) {
        this.setAttribute('id', id);
    }

    setText(text) {
        this.root.getElementById('card-p')
                 .innerHTML = text || '{{ null text }}';
    }

    setThumbnail (url) { 
        this.root.getElementById('card-img').src = url;
    }

    setClickHandler(handler) {
        this.button.onclick = handler;
    }

    getClickHandler() {
        return this.clickHandler;
    }

    toggleEditable() {
        this.button.classList.toggle('editable');
    }

    isEditable() {
        return this.button.classList.contains('editable');        
    }
}
customElements.define('component-card-client', Component_CardClient);