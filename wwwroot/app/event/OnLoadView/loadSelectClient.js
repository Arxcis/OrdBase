'use strict';

import * as api from '../../library/api.js';


//
// @function OnloadViewClientSelector
//
export function loadSelectClient() {

    // Create elements
    const clientSelect = document.createElement('ordbase-select-client');

    // Setup header
    header.textBig          = 'Ordbase';
    header.textSmall        = 'Select Client';
    header.buttonIconLeft   = ICON_HEADER_SQUARE;
    header.buttonIconRight1 = '';    
    header.buttonIconRight2 = ICON_HEADER_PLUS;

    // Dependency injection
    header.buttonHandlerLeft   = defaultHandler;     
    header.buttonHandlerRight1 = defaultHandler;     
    header.buttonHandlerRight2 = defaultHandler;  
    clientSelect.cardButtonHandler = defaultHandler

    // Batch-update DOM
    main.innerHTML = ''; 
    header.DOMUpdate();
    main.appendChild(clientSelect);              
    
    // @ajax - Fetch client data from server
    api.client.getAll().then(clientObjects => {        

                            let cardCount = clientObjects.length;

                            // Spawn DOM element cards (card-client.html)
                            clientSelect.spawnCards(cardCount); 
                            let clientCards = clientSelect.clientCards;
                            
                            // Fill cards with data
                            for (let i = 0; i < cardCount; i++) {
                                let clientCard = clientCards[i];

                                clientCard.id            = `card${i}`;
                                clientCard.name          = clientObjects[i].name;
                                clientCard.website       = 'https://www.placeholder.no';
                                clientCard.thumbnail     = 'http://placehold.it/250x125/FFC107';
                                clientCard.cardButtonHandler = defaultHandler;
                            };
                            
                            // Update DOM again
                            clientSelect.DOMUpdate();
                        })
                        .catch(reason => console.error('Error:', reason))
}
