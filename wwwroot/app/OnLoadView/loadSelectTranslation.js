'use strict';

import * as App from '../App.js';
import * as Api from '/jslib/Api.js';

import { loadEditTranslation } from './loadEditTranslation.js';
import { loadSelectClient }    from './loadSelectClient.js';

const ICON_CHECK      = 'fa-check';
const ICON_TIMES      = 'fa-times';


//
// @function loadSelectTranslation
//
export function loadSelectTranslation (client) {

    // Create elements
    const viewSelectTranslation = document.createElement('ordbase-select-translation');

    // Setup header
    App.header.textBig          = 'Ordbase';
    App.header.textSmall        = 'Select Translation';
    App.header.buttonIconLeft   = ICON_HEADER_BARS;
    App.header.buttonIconRight1 = ICON_HEADER_ARROW_LEFT;    
    App.header.buttonIconRight2 = ICON_HEADER_PLUS;
    
    App.header.onClickButtonRight1 = event => loadSelectClient();
    App.header.onClickButtonRight2 = event => App.defaultHandler();

    // Batch-update DOM
    App.main.removeChild(App.main.firstChild); // @bench towards innerHTML = ''; 
    App.main.appendChild(viewSelectTranslation);       

    //
    // @AJAX - fetch all containers on selected client
    //
    Api.container.getOnClient(client)
        
        .then(containersOnClient => {        
            containersOnClient.forEach(container => {

                let button = viewSelectTranslation.spawnButtonContainer();

                button.id       = container;
                button.text     = container;
                button.selected = '';

                viewSelectTranslation.appendButtonContainer(button);
            });

            return Api.translation.getGroupOnClient(client);
        })
    //
    //  @AJAX - Get all translation groups 
    //  @doc template literals - https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals
    //
            .then(translations => {
                translations.forEach((translation, i) => {

                    let card = viewSelectTranslation.spawnCardTranslation();
                    
                    card.key = translation.key;
                    card.onClickCard = event => loadEditTranslation(translation.key);

                    Object.keys(translations[i].isComplete).forEach((languageKey, isComplete) => {
                        let keyAndIcon = card.spawnKeyAndIcon();

                        keyAndIcon.languageKey = languageKey;
                        keyAndIcon.icon = (isComplete) ? ICON_CHECK : ICON_TIMES;

                        card.appendKeyAndIcon(keyAndIcon);
                    });
                    viewSelectTranslation.appendCardTranslation(card);
                });           
            })
            .catch(reason => console.error('Error:', reason));
}