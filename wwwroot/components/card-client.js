'use strict';
import html from './card-client.html';



export class Component_ClientCard extends HTMLElement {

    //
    // Constructor
    //
    constructor() {
        super();
        this._root = this.createShadowRoot();
        this._root.innerHTML = html;
        this._button = this._root.querySelector('button');

        this._clickHandler  = () => console.log('default.....');
        this._selectHandler = () => console.log('default.....');
        this._editHandler   = () => console.log('default.....');
        this._deleteHandler = () => console.log('default.....');

        this._button.addEventListener('click', () => {
            this._clickHandler();
        });

        this._button.addEventListener('focus', () => {
            if(!this._button.classList.contains('animated'))
                this._button.classList.add('animated');
        })
        
        this._button.addEventListener('mouseover', () => {
            if(!this._button.classList.contains('animated'))           
                this._button.classList.add('animated');
        })  
    }

    //
    // Handle card state machine
    //
    OnSelect(handler)  { this._selectHandler = handler; }
    OnEdit(handler)    { this._editHandler   = handler; }
    OnDelete(handler)  { this._deleteHandler = handler; }
    
    setSelectable() {
        this._button.classList.remove('editable');
        this._button.classList.remove('deleteable');
        this._clickHandler = this._selectHandler;        
    }
 
    setEditable() {
        this._button.classList.add('editable');
        this._button.classList.remove('deleteable');
        this._clickHandler = this._editHandler;
    }

    setDeleteable() {
        this._button.classList.add('deleteable');
        this._button.classList.remove('editable');
        this._clickHandler = this._deleteHandler;
    }

    isEditable()   { return this._button.classList.contains('editable'); }
    isDeleteable() { return this._button.classList.contains('deleteable'); }

    //
    // Set internal data
    //
    setHeading (name){
        this._root.getElementById('card-h2').innerHTML = name;
        this._name = name;
    }    
    setId(id) {
        this.setAttribute('id', id);
    }

    setText(text) {
        this._root.getElementById('card-p').innerHTML = text;
    }
                
    setThumbnail (url) { 
        this._root.getElementById('card-img').src = url;
    }
}
customElements.define('component-card-client', Component_ClientCard);