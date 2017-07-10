'use strict';

import * as api from '../../library/api.js';

// Cache static element references
const main         = document.getElementById('ordbase-main');    
const header       = document.getElementById('ordbase-header');
const defaultHandler = (event) => console.log('Default handler... nothing happened');
//
// @function OnloadViewClientSelector
//
export function loadSelectClient() {

    // Create elements
    const selectClient = document.createElement('ordbase-select-client');

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
    selectClient.cardButtonHandler = defaultHandler

    // Batch-update DOM
    main.innerHTML = ''; 
    header.DOMUpdate();
    main.appendChild(selectClient);              
    
    // @ajax - Fetch client data from server
    api.client.getAll().then(clientObjects => {        

                            let cardCount = clientObjects.length;

                            // Spawn DOM element cards (card-client.html)
                            selectClient.spawnCards(cardCount); 
                            let clientCards = selectClient.clientCards;
                            
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
                            selectClient.DOMUpdate();
                        })
                        .catch(reason => console.error('Error:', reason))
}
