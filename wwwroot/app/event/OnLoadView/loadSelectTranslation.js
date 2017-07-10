'use strict';

import * as App from '/app.js';
import * as Api from '/app/library/api.js';

import { loadEditTranslation } from './loadEditTranslation.js';
import { loadSelectClient }    from './loadSelectClient.js';

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

                let containerCount = containersOnClient.length;
                translationSelect.spawnContainerButtons(containerCount);

                for(let i = 0; i < containerCount; i++) {
                    let button = translationSelect.containerButtons[i];

                    button.id       = containersOnClient[i].name;
                    button.text     = containersOnClient[i].name;
                    button.selected = '';
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
                        let button = translationSelect.getTranslationButton();
                        let group  = translationGroups[i];

                        Object.keys(group.isComplete).forEach((_languageKey, isComplete) => {
                            let keyAndIcon = translationSelect.getKeyAndIcon();

                            button.appendKeyAndIcon(keyAndIcon);
                        });

                        translationSelect.appendTranslationButton(button);
                    }             
            })
            .catch(reason => console.error('Error:', reason));
}