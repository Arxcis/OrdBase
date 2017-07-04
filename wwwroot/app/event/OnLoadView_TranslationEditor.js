'use strict';

import { overwriteFromTemplate }                                    from '../library/Util.js';
import { container as APIContainer, translation as translationApi } from '../library/Api.js'; 
import { OnLoadView_TranslationSelector }                           from '../event/OnLoadView-TranslationSelector.js';
import { OnLoadView_ClientSelector }                                from '../event/OnLoadView_ClientSelector.js';

//
// @function OnLoadView_TranslationEditor
//
export function OnLoadView_TranslationEditor (client, key) {
    
    const view = overwriteFromTemplate(document.body, 'view-translation-editor');
    const containerList = view.querySelector('#list-show-containers-on-translation'); 

    //
    // Get all container on client
    //
    APIContainer.getOnClient(client)
    .then(data => {

        data.forEach(containerName => {
            const button = document.createElement('button');
            button.innerHTML = containerName;
            button.id = 'button-' + containerName;
            button.onclick = (event) => button.classList.toggle('selected'); 

            containerList.appendChild(button);
        });      

        return APIContainer.getOnKey(client, key)
    })
    .then(data => {
        data.forEach(selectedContainer => {
            const button =  document.querySelector('#button-' + selectedContainer);
            if (button) {
               button.classList.add('selected');
            }
        });
    })
    .catch(reason => console.error('Error:', reason));

    //
    // Get data about translations with the same key
    //
    translationApi.getOnKey(client, key)
    .then(data => {
        const main = view.querySelector('ordbase-form-translation'); 

    })
    .catch(reason => console.error('Error:', reason));
 
    // Hook up buttons
    view.querySelector('#btn-toggle-container-list').onclick        = (event) => OnLoadView_TranslationEditor(client);
    view.querySelector('#btn-back-to-home-page').onclick            = (event) => OnLoadView_ClientSelector(client);
    view.querySelector('#btn-back-to-translation-selector').onclick = (event) => OnLoadView_TranslationSelector(client);    
    view.querySelector('#btn-save-edited-translation').onclick      = (event) => OnLoadView_TranslationEditor(client);
}
