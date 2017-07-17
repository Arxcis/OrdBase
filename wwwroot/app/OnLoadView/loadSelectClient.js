'use strict';

import * as App from '../App.js';
import * as Api from '/jslib/Api.js';

import { loadSelectTranslation } from './loadSelectTranslation.js';

//
// @function OnloadViewClientSelector
//
export function loadSelectClient() {

    // Create elements
    const viewSelectClient = document.createElement('ordbase-select-client');

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
    App.main.appendChild(viewSelectClient);              
    
    // @ajax - Fetch client data from server
    Api.client.getAll()
        
        .then(clientObjects => {                                    
            clientObjects.forEach((client) => {

                let card = viewSelectClient.spawnCard();
                
                card.id            = `card${i}`;
                card.heading       =  client.name;
                card.text          = 'https://www.placeholder.no';
                card.thumbnail     = 'http://placehold.it/250x125/FFC107';
                card.buttonHandler = event => loadSelectTranslation(client.name);

                viewSelectClient.appendCard(card);
            });                            
        })
        .catch(reason => console.error('Error:', reason))
}
