'use strict';

import { loadClientSelector } from './loadClientSelector.js';
import { submitClient }       from '../OnSubmitForm/submitClient.js';
import { loadTemplate, unpackTemplate } from '../../library/jet-template-unpacker.js';

const viewTemplate = loadTemplate('./app/view/view-client-editor.html');

export function loadClientEditor() {
    
    const view = unpackTemplate(viewTemplate, {
        bigHeader : 'OrdBase',
        smallHeader : 'Edit Client',
    });

    view.querySelector('#btn-back-to-home-page').onclick     = (event) => loadClientSelector();
    view.querySelector('#btn-back-to-client-select').onclick = (event) => loadClientSelector();
    view.querySelector('#btn-form-client-submit').onclick    = (event) => submitClient(event);

    // Swap views
    document.body.innerHTML = '';
    document.body.appendChild(view);
}