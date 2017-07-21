'use strict';

import * as App from './App.js';
import * as Api from '../jslib/Api.js';

// View and Components
import { Ordbase_SelectClient } from '../components/views/select-client';
import { Ordbase_CardClient   } from '../components/lib/card-client';

// Event logic
import { loadEditClient }        from './loadEditClient.js';
import { loadNewClient }         from './loadNewClient.js'; 
import { loadSelectTranslation } from './loadSelectTranslation.js';


//
// @function OnloadViewClientSelector
//
export function loadSelectClient() {

    // Create elements
    const view = new Ordbase_SelectClient;
    App.MAIN.innerHTML = '';
    App.MAIN.appendChild(view);              


    // Setup header
    App.HEADER.textBig          = 'Ordbase';
    App.HEADER.textSmall        = 'Select Client';
    App.HEADER.buttonIconLeft   = App.ICON_SQUARE;
    App.HEADER.buttonIconRight1 = App.ICON_NONE;    
    App.HEADER.buttonIconRight2 = App.ICON_PLUS;


    App.HEADER.buttonLeft.onclick   = App.defaultHandler;
    App.HEADER.buttonRight1.onclick = App.defaultHandler;
    App.HEADER.buttonRight2.onclick = event => loadNewClient();

    
    // @ajax - Fetch client data from server
    Api.client.getAll()
        
        .then(clientObjects => {                                    
            clientObjects.forEach((client, i) => {

                let card = new Ordbase_CardClient;
                
                card.id            = `card${i}`;
                card.heading       =  client.name;
                card.text          = 'https://www.placeholder.no';
                card.thumbnail     = 'http://placehold.it/250x125/FFC107';
                card.buttonHandler = event => loadSelectTranslation(client.name);

                view.appendCard(card);
            });                            
        })
        .catch(reason => console.error('Error:', reason))
}
