'use strict';

import  { overwriteFromTemplate, appendFromTemplate } from '../library/Util.js';
import  { container as containerApi, translation as translationApi } from '../library/Api.js'; 

import { OnLoadView_TranslationEditor } from '../event/OnLoadView-TranslationEditor.js';
import { OnLoadView_ClientSelector } from '../event/OnLoadView-ClientSelector.js';

//
// @function OnLoadView_TranslationSelector
//
export function OnLoadView_TranslationSelector (client) {

    const fontAwesome_checkIconClass = 'fa-check';
    const fontAwesome_crossIconClass = 'fa-times';

    const view = overwriteFromTemplate(document.body, 'view-translation-selector');

    //
    // Get all container names
    //
    containerApi.getOnClient(client)
    .then(data => {

        data.forEach(containerName => {
            const button = document.createElement('button');
            view.querySelector('#list-show-containers-on-client').appendChild(button);

            button.innerHTML = containerName;
            button.id = 'button-' + containerName;
            button.onclick = (event) => button.classList.toggle('selected');
        });      
    })
    .catch(reason => console.error('Error:', reason));

    //
    // Get all translation groups 
    //  @doc template literals - https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals
    //
    translationApi.getGroupOnClient(client)
    .then(data => {
        data.forEach(translationGroup => {

            const card = document.createElement('ordbase-card-translation');
            view.querySelector('#list-show-translations-on-client').appendChild(card);
            
            card.querySelector('.btn-load-translation-editor').onclick = (event) => OnLoadView_TranslationEditor(client, translationGroup.key); 
            card.querySelector('.translation-key').innerHTML = translationGroup.key;
            
            const languagesComplete = card.querySelector('.languages-complete');
            const keyAndIconPrototype = card.querySelector('.key-and-icon');
                            
            Object.keys(translationGroup.isComplete)
            .forEach((languageKey, isComplete) => {

                const clone = keyAndIconPrototype.cloneNode(true);
                clone.querySelector('.language-key').innerHTML = languageKey;
                if (isComplete)  
                    clone.querySelector('.language-icon').classList.add(fontAwesome_checkIconClass);
                else 
                    clone.querySelector('.language-icon').classList.add(fontAwesome_crossIconClass);
                
                languagesComplete.appendChild(clone);
            });

            // Remove the prototype
            languagesComplete.removeChild(keyAndIconPrototype);
        });
    })
    .catch(reason => console.error('Error:', reason));

    // Hook up all buttons
    view.querySelector('#btn-toggle-container-list').onclick   = (event) => OnLoadView_ClientSelector();
    view.querySelector('#btn-back-to-home-page').onclick       = (event) => OnLoadView_ClientSelector();
    view.querySelector('#btn-back-to-client-selector').onclick = (event) => OnLoadView_ClientSelector();
    view.querySelector('#btn-create-new-translation').onclick  = (event) => OnLoadView_ClientSelector();
}