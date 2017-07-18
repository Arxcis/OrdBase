'use strict';
import html from './template.html';


export class Ordbase_SelectClient extends HTMLElement {

    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
    }

    appendCard(card)  {   this.root.appendChild(card);                 }
}
customElements.define('ordbase-select-client', OrdbaseSelectClient);