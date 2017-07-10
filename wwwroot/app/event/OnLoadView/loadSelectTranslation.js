'use strict';

import * as App from '/app.js';
import * as Api from '/app/library/api.js';

import { loadEditTranslation } from './loadEditTranslation.js';
import { loadSelectClient }    from './loadSelectClient.js';

const ICON_CHECK      = 'fa-check';
const ICON_TIMES      = 'fa-times';


//
// @function loadSelectTranslation
//
export function loadSelectTranslation (client) {

    // Create elements
    const translationSelect = document.createElement('ordbase-select-translation');

    // Setup header
    App.header.data = {
        textBig          : 'Ordbase',
        textSmall        : 'Select Translation',
        buttonIconLeft   : ICON_HEADER_BARS,
        buttonIconRight1 : ICON_HEADER_ARROW_LEFT,    
        buttonIconRight2 : ICON_HEADER_PLUS,
    };
        // Dependency injection
    App.header.handlerButtonLeft   = App.defaultHandler;     
    App.header.handlerButtonRight1 = App.defaultHandler;     
    App.header.handlerButtonRight2 = App.defaultHandler;  
    

    // Batch-update DOM
    App.header.DOMUpdate();
    App.main.removeChild(App.main.firstChild); // @bench towards innerHTML = ''; 
    App.main.appendChild(translationSelect);       

    //
    // @AJAX - fetch all containers on selected client
    //
    api.container.getOnClient(client).then(containersOnClient => {

                for(let i = 0; i < containersOnClient.length; i++) {
                    let button = translationSelect.spawnButtonContainer();

                    button.id       = containersOnClient[i].name;
                    button.text     = containersOnClient[i].name;
                    button.selected = '';

                    translationSelect.appendContainerButton(button);
                }

                return api.translation.getGroupOnClient(client);
            })
    //
    //  @AJAX - Get all translation groups 
    //  @doc template literals - https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals
    //
            .then(translationGroups => {

                    let groupCounts = group
                    
                    for (let i = 0; i < groupCount; i++) {
                        let card = translationSelect.spawnCardTranslation();
                        let group  = translationGroups[i];

                        Object.keys(group.isComplete).forEach((languageKey, isComplete) => {
                            let keyAndIcon = translationSelect.spawnKeyAndIcon();

                            keyAndIcon.languageKey = languageKey;
                            keyAndIcon.icon = (isComplete) ? ICON_CHECK : ICON_TIMES;

                            button.appendKeyAndIcon(keyAndIcon);
                        });

                        translationSelect.appendTranslationButton(button);
                    }             
            })
            .catch(reason => console.error('Error:', reason));
}