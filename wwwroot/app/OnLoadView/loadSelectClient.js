'use strict';

import * as App from '../App.js';
import * as Api from '/jslib/Api.js';

import { loadSelectTranslation } from './loadSelectTranslation.js';

//
// @function OnloadViewClientSelector
//
export function loadSelectClient() {

    // Create elements
    const clientSelect = document.createElement('ordbase-select-client');

    // Setup header
    App.header.textBig          = 'Ordbase';
    App.header.textSmall        = 'Select Client';
    App.header.buttonIconLeft   = ICON_HEADER_SQUARE;
    App.header.buttonIconRight1 = ICON_HEADER_NONE;    
    App.header.buttonIconRight2 = ICON_HEADER_PLUS;


    App.header.onClickButtonLeft   = App.defaultHandler;
    App.header.onClickButtonRight1 = App.defaultHandler;
    App.header.onClickButtonRight2 = App.defaultHandler;

    // Batch-update DOM
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
                                card.buttonHandler = event => loadSelectTranslation(clientObjects[i].name);

                                console.log(clientObjects[i].name);
                                clientSelect.appendCard(card);
                            };                            
                        })
                        .catch(reason => console.error('Error:', reason))
}
