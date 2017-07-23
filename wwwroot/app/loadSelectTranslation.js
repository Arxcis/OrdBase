'use strict';

import * as App from './App.js';
import * as Api from '../jslib/Api.js';

import { Ordbase_SelectTranslation } from '../components/views/select-translation.js';
import { Ordbase_ButtonSelect }   from '../components/lib/button-select.js';
import { Ordbase_CardTranslation }   from '../components/lib/card-translation.js';
import { Ordbase_KeyAndIcon }        from '../components/lib/key-and-icon.js';

import { loadNewTranslation }  from './loadNewTranslation.js';
import { loadEditTranslation } from './loadEditTranslation.js';
import { loadSelectClient }    from './loadSelectClient.js';

//
// @function loadSelectTranslation
//
export function loadSelectTranslation (client) {

    // Create elements
    const view =  App.switchView(new Ordbase_SelectTranslation);

    // Setup header
    App.HEADER.textBig          = 'Ordbase';
    App.HEADER.textSmall        = 'Select Translation';
    App.HEADER.buttonIconLeft   = App.ICON_BARS;
    App.HEADER.buttonIconRight1 = App.ICON_ARROW_LEFT;    
    App.HEADER.buttonIconRight2 = App.ICON_PLUS;

    App.HEADER.buttonLeft.onclick   = App.defaultHandler;
    App.HEADER.buttonRight1.onclick = event => loadSelectClient();
    App.HEADER.buttonRight2.onclick = event => loadNewTranslation(client);

    //
    // @AJAX - fetch all containers on selected client
    //
    Api.container.getOnClient(client)
        
        .then(containersOnClient => {        
            containersOnClient.forEach(container => {

                let button = new Ordbase_ButtonSelect;

                button.id       = container;
                button.text     = container;
                button.selected = '';

                view.appendButtonContainer(button);
            });

            return Api.translation.getGroupOnClient(client);
        })
    //
    //  @AJAX - Get all translation groups 
    //  @doc template literals - https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals
    //
            .then(translations => {
                translations.forEach((translation, i) => {

                    let card = new Ordbase_CardTranslation;
                    
                    card.key = translation.key;
                    card.onClickCard = event => loadEditTranslation(client, translation.key);

                    Object.keys(translations[i].isComplete).forEach((languageKey, isComplete) => {
                        
                        let keyAndIcon = new Ordbase_KeyAndIcon;

                        keyAndIcon.languageKey = languageKey;
                        keyAndIcon.icon = (isComplete) ? App.ICON_CHECK : App.ICON_TIMES;

                        card.appendKeyAndIcon(keyAndIcon);
                    });
                    view.appendCardTranslation(card);
                });           
            })
            .catch(reason => console.error('Error:', reason));
}