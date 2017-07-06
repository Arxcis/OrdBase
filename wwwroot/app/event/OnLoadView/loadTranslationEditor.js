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

        let containerList = viewContent.querySelector('#list-show-containers-on-translation');

        containersOnClient.forEach( container => {

            const button = unpackTemplate(containerButtonTemplate, {
                id : `button-${container}`,
                text : container,
                selected : (selectedContainer == container ? 'selected' : ''),
            }).querySelector('button');

            button.onclick = (event) => event.target.classList.toggle('selected'); 
            containerList.appendChild(button);
        });

        return api.translation.getOnKey(client, key);
    })
    .then( translationGroup => {
        console.log(translationGroup);

        translationGroup.forEach(translation => {

        });
        
    })
    .catch(reason => console.error('Error:', reason))
    .then(() => {                                  
        // Clear all previous content, insert new view
        document.body.innerHTML = ''; 
        document.body.appendChild(viewContent);
    });
}
