'use strict';

import { loadTemplate } from '../library/jet-template-loader.js';
import { container as containerApi, translation as translationApi } from '../library/api.js'; 
import { OnLoadView_TranslationSelector }                           from '../event/OnLoadView_TranslationSelector.js';
import { OnLoadView_ClientSelector }                                from '../event/OnLoadView_ClientSelector.js';

//
// @function OnLoadView_TranslationEditor
//
export function OnLoadView_TranslationEditor (client, key) {
    
    let containersOnClient = {};

    loadTemplate('./app/view/view-translation-editor.html', {
        bigHeader : 'Ordbase',
        smallHeader : 'Select client',
   
    }).then( viewTemplate => {
        let viewContent = viewTemplate.content; 

        viewContent.querySelector('#btn-toggle-container-list').onclick        = (event) => OnLoadView_TranslationEditor(client);
        viewContent.querySelector('#btn-back-to-home-page').onclick            = (event) => OnLoadView_ClientSelector(client);
        viewContent.querySelector('#btn-back-to-translation-selector').onclick = (event) => OnLoadView_TranslationSelector(client);    
        viewContent.querySelector('#btn-save-edited-translation').onclick      = (event) => OnLoadView_TranslationEditor(client);

        document.body.innerHTML = '';
        document.body.appendChild(viewContent);

        return containerApi.getOnClient(client);
    })  
    .then(_containersOnClient => {

        containersOnClient = _containersOnClient;
        return containerApi.getOnKey(client, key);
    })
    .then(selectedContainer => {

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
    .catch(reason => console.error('Error:', reason));

}
