'use strict';

import * as App from '../App.js';
import * as Api from '../../jslib/Api.js';

import { Ordbase_SelectTranslation } from '../../components/views/select-translation';
import { Ordbase_ButtonContainer }   from '../../components/lib/button-container';
import { Ordbase_CardTranslation }   from '../../components/lib/card-translation';
import { Ordbase_KeyAndIcon }        from '../../components/lib/key-and-icon';

import { loadNewTranslation }  from './loadNewTranslation.js';
import { loadEditTranslation } from './loadEditTranslation.js';
import { loadSelectClient }    from './loadSelectClient.js';

//
// @function loadSelectTranslation
//
export function loadSelectTranslation (client) {

    // Create elements
    const view = new Ordbase_SelectTranslation;
    App.MAIN.removeChild(App.MAIN.firstChild); // @bench towards innerHTML = ''; 
    App.MAIN.appendChild(view);       

    // Setup header
    App.HEADER.textBig          = 'Ordbase';
    App.HEADER.textSmall        = 'Select Translation';
    App.HEADER.buttonIconLeft   = App.ICON_BARS;
    App.HEADER.buttonIconRight1 = App.ICON_ARROW_LEFT;    
    App.HEADER.buttonIconRight2 = App.ICON_PLUS;
    
    App.HEADER.onClickButtonRight1 = event => loadSelectClient();
    App.HEADER.onClickButtonRight2 = event => loadNewTranslation(client);

    //
    // @AJAX - fetch all containers on selected client
    //
    Api.container.getOnClient(client)
        
        .then(containersOnClient => {        
            containersOnClient.forEach(container => {

                let button = new Ordbase_ButtonContainer;

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