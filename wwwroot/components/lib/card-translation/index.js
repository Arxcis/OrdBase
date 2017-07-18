'use strict';
import { generateShadowRoot } from '/jslib/Util.js';
import { html } from './template.html';


export class OrdbaseCardTranslation extends HTMLElement { 
    constructor() {
        super();
        this.root = generateShadowRoot.call(this, html);
    }
    
    set key (key)            { this.root.querySelector('span').innerHTML = key;  }
    set onClickCard(handler) { this.root.querySelector('button').onclick = handler; }

    cloneKeyAndIcon() { 
        return ELEMENT_KEY_AND_ICON.cloneNode(true);            
    }

    appendKeyAndIcon(keyAndIcon) { 
        this.root.querySelector('div').appendChild(keyAndIcon); 
    }
}
customElements.define('ordbase-card-translation', OrdbaseCardTranslation);