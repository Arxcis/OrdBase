'use strict';

import * as App from './App.js';
import * as Api from '../lib/Api.js';

import { View_SelectClient }      from '../views/select-client.js';

import { Component_CardClient   } from '../components/card-client.js';

import { loadEditClient }        from './loadEditClient.js';
import { loadNewClient }         from './loadNewClient.js'; 
import { loadSelectTranslation } from './loadSelectTranslation.js';


//
// @function OnloadViewClientSelector
//
export function loadSelectClient() {

    // Create elements
    const view = App.switchView(new View_SelectClient);
    let cards = new Array;

    // Setup header
    App.HEADER.textBig          = 'Ordbase';
    App.HEADER.textSmall        = 'Select Client';
    App.HEADER.buttonIconLeft   = App.ICON_SQUARE;
    App.HEADER.buttonIconRight1 = App.ICON_PENCIL;    
    App.HEADER.buttonIconRight2 = App.ICON_PLUS;

    App.HEADER.buttonLeft.onclick   = App.defaultHandler;
    
    App.HEADER.buttonRight1.onclick = event => {
        for (let i = 0; i < cards.length; i++) {
            
        }
    };

    App.HEADER.buttonRight2.onclick = event => loadNewClient();

    
    // @ajax - Fetch client data from server
    Api.client.getAll()
        
        .then(clientObjects => {                                    
            clientObjects.forEach((client, i) => {

                let card = new Component_CardClient;
                
                card.id            = `card${i}`;
                card.heading       =  client.name;
                card.text          =  client.webpageUrl;
                card.thumbnail     = 'http://placehold.it/250x125/FFC107';
                card.buttonHandler = event => loadSelectTranslation(client.name);

                cards.push(card);
                view.appendCard(card);
            });                            
        })
        .catch(reason => console.error('Error:', reason))
}
