'use strict';

import * as App from './App.js';
import * as Api from '../jslib/Api.js'; 

// View and components
import { Ordbase_EditTranslation }     from '../components/views/edit-translation.js';
import { Ordbase_ButtonSelect }        from '../components/lib/button-select.js';
import { Ordbase_FieldsetTranslation } from '../components/lib/fieldset-translation.js';

// Event handlers
import { loadSelectTranslation }      from './loadSelectTranslation.js';
import { loadSelectClient }           from './loadSelectClient.js';

//
// @function loadEditTranslation
//
export function loadEditTranslation (client, key) {

    App.HEADER.textBig          = 'Ordbase';
    App.HEADER.textSmall        = 'Edit translation';

    App.HEADER.buttonIconLeft   = App.ICON_BARS;
    App.HEADER.buttonIconRight1 = App.ICON_NONE;    
    App.HEADER.buttonIconRight2 = App.ICON_TIMES;
    
    App.HEADER.buttonLeft.onclick   = App.defaultHandler;
    App.HEADER.buttonRight1.onclick = App.defaultHandler;
    App.HEADER.buttonRight2.onclick = event => loadSelectTranslation(client);

    const view = App.switchView(new Component_EditTranslation);

    let containersOnClient = {};

    Api.container.getOnClient(client)
        //
        // @ajax promise
        //
        .then(_containersOnClient => {
            containersOnClient = _containersOnClient;  
            return Api.container.getOnKey(client, key);
        })
        //
        // @ajax promise
        //
        .then(selectedContainer => {

            containersOnClient.forEach( container => {

                let button = new Ordbase_ButtonSelect;

                button.id = `button-${container}`,
                button.text = container,
                button.selected = (selectedContainer == container ? 'selected' : '');

                view.appendButtonContainer(button);
            });
            return Api.translation.getOnKey(client, key);
        })
        //
        // @ajax promise
        //
        .then(translationGroup => {

            translationGroup.forEach( translation => {

                let fieldset = new Ordbase_FieldsetTranslation;

                fieldset.languageCode = translation.languageKey;
                fieldset.inputId      = `input-${translation.languageCode}`;
                fieldset.inputValue   = translation.text;
                fieldset.checked      = translation.isComplete;

                view.appendFieldset(fieldset);
            });
        })
        .catch(reason => console.error('Error:', reason))
}
