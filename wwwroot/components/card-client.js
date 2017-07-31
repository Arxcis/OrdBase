'use strict';
import html from './card-client.html';



export class Component_ClientCard extends HTMLElement {

    //
    // Constructor
    //
    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
        this.button = this.root.querySelector('button');

        this.clickHandler  = () => console.log('default.....');
        this.selectHandler = () => console.log('default.....');
        this.editHandler   = () => console.log('default.....');
        this.deleteHandler = () => console.log('default.....');

        this.button.addEventListener('click', () => {
            this.clickHandler();
        });

        this.button.addEventListener('focus', () => {
            if(!this.button.classList.contains('animated'))
                this.button.classList.add('animated');
        })
        
        this.button.addEventListener('mouseover', () => {
            if(!this.button.classList.contains('animated'))           
                this.button.classList.add('animated');
        })  
    }

    //
    // Handle card state machine
    //
    OnSelect(handler)  { this.selectHandler = handler; }
    OnEdit(handler)    { this.editHandler   = handler; }
    OnDelete(handler)  { this.deleteHandler = handler; }
    
    setSelectable() {
        this.button.classList.remove('editable');
        this.button.classList.remove('deleteable');
        this.clickHandler = this.selectHandler;        
    }
 
    setEditable() {
        this.button.classList.add('editable');
        this.button.classList.remove('deleteable');
        this.clickHandler = this.editHandler;
    }

    setDeleteable() {
        this.button.classList.add('deleteable');
        this.button.classList.remove('editable');
        this.clickHandler = this.deleteHandler;
    }

    isEditable()   { return this.button.classList.contains('editable'); }
    isDeleteable() { return this.button.classList.contains('deleteable'); }

    //
    // Set internal data
    //
    setHeading (name){
        this.root.getElementById('card-h2').innerHTML = name || '{{ null heading }}';
        this._name = name;
    }    
    setId(id) {
        this.setAttribute('id', id);
    }

    setText(text) {
        this.root.getElementById('card-p').innerHTML = text || '{{ null text }}';
    }
                
    setThumbnail (url) { 
        this.root.getElementById('card-img').src = url;
    }
}
customElements.define('component-card-client', Component_ClientCard);