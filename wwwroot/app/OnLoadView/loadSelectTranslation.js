'use strict';

import * as App from '../App.js';
import * as Api from '../../jslib/Api.js';

import { OrdbaseSelectTranslation } from '../../components/views/select-translation';
import { OrdbaseButtonContainer }   from '../../components/lib/button-container';
import { OrdbaseCardTranslation }   from '../../components/lib/card-translation';
import { OrdbaseKeyAndIcon }        from '../../components/lib/key-and-icon';

//import { loadEditTranslation } from './loadEditTranslation.js';
import { loadSelectClient }    from './loadSelectClient.js';


const ICON_CHECK      = 'fa-check';
const ICON_TIMES      = 'fa-times';


//
// @function loadSelectTranslation
//
export function loadSelectTranslation (client) {

    // Create elements
    const view = new OrdbaseSelectTranslation;
    App.MAIN.removeChild(App.MAIN.firstChild); // @bench towards innerHTML = ''; 
    App.MAIN.appendChild(view);       

    // Setup header
    App.HEADER.textBig          = 'Ordbase';
    App.HEADER.textSmall        = 'Select Translation';
    App.HEADER.buttonIconLeft   = App.ICON_HEADER_BARS;
    App.HEADER.buttonIconRight1 = App.ICON_HEADER_ARROW_LEFT;    
    App.HEADER.buttonIconRight2 = App.ICON_HEADER_PLUS;
    
    App.HEADER.onClickButtonRight1 = event => loadSelectClient();
    App.HEADER.onClickButtonRight2 = App.defaultHandler;

    //
    // @AJAX - fetch all containers on selected client
    //
    Api.container.getOnClient(client)
        
        .then(containersOnClient => {        
            containersOnClient.forEach(container => {

                let button = new OrdbaseButtonContainer;

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

                    let card = new OrdbaseCardTranslation;
                    
                    card.key = translation.key;
                    card.onClickCard = event => loadEditTranslation(translation.key);

                    Object.keys(translations[i].isComplete).forEach((languageKey, isComplete) => {
                        
                        let keyAndIcon = new OrdbaseKeyAndIcon;

                        keyAndIcon.languageKey = languageKey;
                        keyAndIcon.icon = (isComplete) ? ICON_CHECK : ICON_TIMES;

                        card.appendKeyAndIcon(keyAndIcon);
                    });
                    view.appendCardTranslation(card);
                });           
            })
            .catch(reason => console.error('Error:', reason));
}