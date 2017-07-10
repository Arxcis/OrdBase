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
    

    translationSelect.cardButtonHandler = App.defaultHandler;

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

                                            button.ID             = containersOnClient[i].name;
                                            button.containerName  = containersOnClient[i].name;
                                            button.isSelected     = '';
                                            button.onClickHandler = event.target.classList.toggle('selected');
                                        }

                                        return api.translation.getGroupOnClient(client);
    })
    //
    //  @AJAX - Get all translation groups 
    //  @doc template literals - https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals
    //
    .then(translationGroups => {

        let groupCount = group
        translationSelect.spawnTranslationButtons(groupCount);    
        
        for (let i = 0; i < groupCount; i++) {
            let button = translationSelect.translationButtons[i]
            let group  = translationGroups[i];

            translationSelect.spawnKeysAndIcons(button, );

        }
    
            Object.keys(translationGroup.isComplete).forEach((_languageKey, isComplete) => {
             
                const keyAndIcon = unpackTemplate(keyIconTemplate, {
                    languageKey : _languageKey,
                    fontawesomeClass : (isComplete ? fontAwesome_checkIconClass : fontAwesome_timesIconClass)
                });
                languagesComplete.appendChild(keyAndIcon);
            });

            // Remove the prototype
            cardContent.querySelector('.btn-load-translation-editor').onclick = (event) => loadEditTranslation(client, translationGroup.key);             
            translationList.appendChild(cardContent);   
        });
    })
    .catch(reason => console.error('Error:', reason));
}