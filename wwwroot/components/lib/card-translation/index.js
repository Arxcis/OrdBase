'use strict';
import { html } from './template.html';


export class OrdbaseCardTranslation extends HTMLElement { 
    constructor() {
        super();
        this.root = this.createShadowRoot();
        this.root.innerHTML = html;
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