'use strict';

import * as App from '/app.js';
import * as Api from '/app/library/api.js';

//import { loadSelectTranslation } from './loadSelectTranslation.js';

//
// @function OnloadViewClientSelector
//
export function loadSelectClient() {

    // Create elements
    const clientSelect = App.clientSelect;

    // Setup header
    App.header.data = {
        textBig          : 'Ordbase',
        textSmall        : 'Select Client',
        buttonIconLeft   : ICON_HEADER_SQUARE,
        buttonIconRight1 : '',    
        buttonIconRight2 : ICON_HEADER_PLUS,
    };

    // Dependency injection
    App.header.handlerButtonLeft   = App.defaultHandler;     
    App.header.handlerButtonRight1 = App.defaultHandler;     
    App.header.handlerButtonRight2 = App.defaultHandler;  

    // Batch-update DOM
    App.header.DOMUpdate();
    App.main.innerHTML = '';
    App.main.appendChild(clientSelect);              
    
    // @ajax - Fetch client data from server
    Api.client.getAll().then(clientObjects => {        
                            
                            // Fill cards with data
                            for (let i = 0; i < clientObjects.length; i++) {
                                let card = clientSelect.spawnCard();

                                card.id            = `card${i}`;
                                card.heading       = clientObjects[i].name;
                                card.text          = 'https://www.placeholder.no';
                                card.thumbnail     = 'http://placehold.it/250x125/FFC107';
                                card.buttonHandler = App.defaultHandler;

                                clientSelect.appendCard(card);
                            };
                            
                            // Update DOM again
                            clientSelect.render();
                        })
                        .catch(reason => console.error('Error:', reason))
}
