'use strict';

import  { swapView } from '../library/Util.js';
import  { container as containerApi, translation as translationApi } from '../library/Api.js'; 

import { OnLoadView_TranslationEditor } from '../event/OnLoadView-TranslationEditor.js';
import { OnLoadView_ClientSelector } from '../event/OnLoadView-ClientSelector.js';

//
// @function OnLoadView_TranslationSelector
//
export function OnLoadView_TranslationSelector (client) {

    const iconCheck = '<i class="fa fa-check" aria-hidden="true"></i>';
    const iconCross = '<i class="fa fa-times" aria-hidden="true"></i>';

    let view = document.createElement('view-translation-selector');
    swapView(view);

    //
    // Get all container names
    //
    containerApi.getOnClient(client)
    .then(data => {

        data.forEach(containerName => {
            let button = document.createElement('button');
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

            let card = document.createElement('ordbase-card-translation');
            view.querySelector('#list-show-translations-on-client').appendChild(card);
            
            card.querySelector('#btn-load-translation-editor').onclick = (event) => OnLoadView_TranslationEditor(client, translationGroup.key); 
            card.querySelector('#span-show-translation-key').innerHTML = translationGroup.key;
            let divLanguagesComplete = card.querySelector('#div-show-if-languages-are-complete');
                            
            Object.keys(translationGroup.isComplete)
            .forEach((key, value) => {

                if (value == true) 
                    divLanguagesComplete.innerHTML += `<div class="languages-complete-text-icon"><span>${key}</span>` + iconCheck + '</div class="languages-complete-text-icon">';
                else
                    divLanguagesComplete.innerHTML += `<div class="languages-complete-text-icon"><span>${key}</span>` + iconCross + '</div class="languages-complete-text-icon">';
            });
        });
    })
    .catch(reason => console.error('Error:', reason));

    // Hook up all buttons
    view.querySelector('#btn-toggle-container-list').onclick   = (event) => OnLoadView_ClientSelector();
    view.querySelector('#btn-back-to-home-page').onclick       = (event) => OnLoadView_ClientSelector();
    view.querySelector('#btn-back-to-client-selector').onclick = (event) => OnLoadView_ClientSelector();
    view.querySelector('#btn-create-new-translation').onclick  = (event) => OnLoadView_ClientSelector();
}