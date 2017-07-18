'use strict';

import * as App from '../App.js';
import * as Api from '../../jslib/Api.js'; 

// View and components
import { Ordbase_EditTranslation }     from '../../components/views/edit-translation';
import { Ordbase_ButtonContainer }     from '../../components/lib/button-container';
import { Ordbase_FieldsetTranslation } from '../../components/lib/fieldset-translation';

// Event handlers
import { submitTranslation }          from '../OnSubmitForm/submitTranslation.js';
import { loadSelectTranslation }      from './loadSelectTranslation.js';
import { loadSelectClient }           from './loadSelectClient.js';

//
// @function loadEditTranslation
//
export function loadEditTranslation (client, key) {

    let containersOnClient = {};
    const view = new Ordbase_EditTranslation;

    App.HEADER.textBig          = 'Ordbase';
    App.HEADER.textSmall        = 'Edit translation';
    App.HEADER.buttonIconLeft   = App.ICON_BARS;
    App.HEADER.buttonIconRight1 = App.ICON_NONE;    
    App.HEADER.buttonIconRight2 = App.ICON_TIMES;
    
    App.HEADER.onClickButtonLeft   = App.defaultHandler;
    App.HEADER.onClickButtonRight1 = event => loadSelectClient();
    App.HEADER.onClickButtonRight2 = App.defaultHandler;

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

        const containerList = unpackTemplate(containerListTemplate).querySelector('div');

        containersOnClient.forEach( container => {

            const containerButton = unpackTemplate(containerButtonTemplate, {
                id : `button-${container}`,
                text : container,
                selected : (selectedContainer == container ? 'selected' : ''),
            }).querySelector('button');

            containerList.appendChild(containerButton);
        });

        view.querySelector('#list-show-containers-on-translation').appendChild(containerList);
    
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
}
