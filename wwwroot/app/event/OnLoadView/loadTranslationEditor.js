'use strict';

import * as api from '../../library/api.js'; 
import { submitTranslation }            from '../OnSubmitForm/submitTranslation.js';
import { loadTranslationSelector }      from './loadTranslationSelector.js';
import { loadClientSelector }           from './loadClientSelector.js';
import { loadTemplate, loadTemplateDoc, unpackTemplate } from '../../library/jet-template-unpacker.js';

const viewTemplate = loadTemplateDoc('./app/view/view-translation-editor.html');
const containerButtonTemplate = loadTemplateDoc('./app/component/button-container.html');
const translationFieldsetTemplate = loadTemplate('template-fieldset-translation', viewTemplate);

//
// @function loadTranslationEditor
//
export function loadTranslationEditor (client, key) {
    
    let containersOnClient = {};

    const view = unpackTemplate(viewTemplate, {
        bigHeader : 'Ordbase',
        smallHeader : 'Edit translation',
        translationKey : key,
        submitButtonText : 'Save changes',
    });

    view.querySelector('#btn-toggle-container-list').onclick        = (event) => loadTranslationEditor(client);
    view.querySelector('#btn-back-to-home-page').onclick            = (event) => loadClientSelector();
    view.querySelector('#btn-back-to-translation-selector').onclick = (event) => loadTranslationSelector(client);    
    view.querySelector('#btn-save-edited-translation').onclick      = (event) => loadTranslationEditor(client);
    view.querySelector('#btn-form-submit-translation').onclick      = (event) => submitTranslation(event);
    //
    // @AJAX - Call to get all containers on a client
    //
    api.container.getOnClient(client).then(_containersOnClient => {

        containersOnClient = _containersOnClient;  
        return api.container.getOnKey(client, key);
    
    })
    //
    // @AJAX - Call to get the container which this translationGroup is connected to
    //
    .then(selectedContainer => {

        let containerList = view.querySelector('#list-show-containers-on-translation');

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
    //
    // @AJAX - Call to get a specific translationGroup to build the translation form
    //
    .then(translationGroup => {

        let fieldsetDiv = view.querySelector('#fieldset-one-for-each-language');
        translationGroup.forEach( translation => {

            console.log(translation);
            const translationFieldset = unpackTemplate( translationFieldsetTemplate, {
                languageCode : translation.languageKey,
                inputId : `input-${translation.languageCode}`,
                inputValue : translation.text,
            });

            translationFieldset.querySelector('[type="checkbox"]').checked = translation.isComplete;
            fieldsetDiv.appendChild(translationFieldset);
        });
    })
    .catch(reason => console.error('Error:', reason))
    .then(() => {                                  
        // Clear all previous content, insert new view
        document.body.innerHTML = ''; 
        document.body.appendChild(view);
    });
}