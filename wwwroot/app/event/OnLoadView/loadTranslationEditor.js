'use strict';

import * as api from '../../library/api.js'; 
import { loadTemplate, unpackTemplate }                             from '../../library/jet-template-unpacker.js';
import { loadTranslationSelector }                           from './loadTranslationSelector.js';
import { loadClientSelector }                                from './loadClientSelector.js';

const viewTemplate = loadTemplate('./app/view/view-translation-editor.html');
const containerButtonTemplate = loadTemplate('./app/component/button-container.html');

//
// @function loadTranslationEditor
//
export function loadTranslationEditor (client, key) {
    
    let containersOnClient = {};
    let viewContent = unpackTemplate(viewTemplate, {
        bigHeader : 'Ordbase',
        smallHeader : 'Edit translation',
    });

    viewContent.querySelector('#btn-toggle-container-list').onclick        = (event) => loadTranslationEditor(client);
    viewContent.querySelector('#btn-back-to-home-page').onclick            = (event) => loadClientSelector(client);
    viewContent.querySelector('#btn-back-to-translation-selector').onclick = (event) => loadTranslationSelector(client);    
    viewContent.querySelector('#btn-save-edited-translation').onclick      = (event) => loadTranslationEditor(client);

    api.container.getOnClient(client).then(_containersOnClient => {

        containersOnClient = _containersOnClient;  
        return api.container.getOnKey(client, key);
    
    }).then(selectedContainer => {

        let containerList = document.querySelector('#list-show-containers-on-translation');

        containersOnClient.forEach( container => {

            const button = document.createElement('button');
            button.innerHTML = container;
            button.id = 'button-' + container;
            button.onclick = (event) => button.classList.toggle('selected'); 

            if (selectedContainer === container)
                button.classList.add('selected');

            containerList.appendChild(button);
        });

    })
    .catch(reason => console.error('Error:', reason))
    .then(() => {                                  
        // Clear all previous content, insert new view
        document.body.innerHTML = ''; 
        document.body.appendChild(viewContent);
    });
}
