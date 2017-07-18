'use strict';
import { generateShadowRoot } from '/jslib/Util.js';
import { html } from './template.html';


export class OrdbaseButtonSubmit extends HTMLElement {
    constructor(){
        super();
        this.root = generateShadowRoot.call(this, html);
    }
}