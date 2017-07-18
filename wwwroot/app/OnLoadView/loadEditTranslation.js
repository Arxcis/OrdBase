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

    const view = new Ordbase_EditTranslation;
    App.MAIN.innerHTML = '';
    App.MAIN.appendChild(view);

    App.HEADER.textBig          = 'Ordbase';
    App.HEADER.textSmall        = 'Edit translation';
    App.HEADER.buttonIconLeft   = App.ICON_BARS;
    App.HEADER.buttonIconRight1 = App.ICON_NONE;    
    App.HEADER.buttonIconRight2 = App.ICON_TIMES;
    
    App.HEADER.onClickButtonLeft   = App.defaultHandler;
    App.HEADER.onClickButtonRight1 = event => loadSelectClient();
    App.HEADER.onClickButtonRight2 = App.defaultHandler;

    let containersOnClient = {};
    
    api.container.getOnClient(client)
        //
        // @ajax promise
        //
        .then(_containersOnClient => {
            containersOnClient = _containersOnClient;  
            return api.container.getOnKey(client, key);
        })
        //
        // @ajax promise
        //
        .then(selectedContainer => {

            containersOnClient.forEach( container => {

                const button = new Ordbase_ButtonContainer;

                button.id = `button-${container}`,
                button.text = container,
                button.selected = (selectedContainer == container ? 'selected' : '');

                view.appendButtonContainer(button);
            });
            return api.translation.getOnKey(client, key);
        })
        //
        // @ajax promise
        //
        .then(translationGroup => {

            translationGroup.forEach( translation => {

                const fieldset = new Ordbase_FieldsetTranslation;

                fieldset.languageCode = translation.languageKey;
                fieldset.inputId      = `input-${translation.languageCode}`;
                fieldset.inputValue   = translation.text;
                fieldset.checked      = translation.isComplete;

                view.appendFieldset(fieldset);
            });
        })
        .catch(reason => console.error('Error:', reason))
}
