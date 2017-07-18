'use strict';

import * as App from '../App.js';
import * as Api from '../../jslib/Api.js';

// Components
import { OrdbaseSelectClient } from '../../components/views/select-client';
import { OrdbaseCardClient   } from '../../components/lib/card-client';

// Event logic
//import { loadEditClient }        from './loadEditClient.js';
import { loadSelectTranslation } from './loadSelectTranslation.js';


//
// @function OnloadViewClientSelector
//
export function loadSelectClient() {

    // Create elements
    const view = new OrdbaseSelectClient;
    App.MAIN.innerHTML = '';
    App.MAIN.appendChild(view);              


    // Setup header
    App.HEADER.textBig          = 'Ordbase';
    App.HEADER.textSmall        = 'Select Client';
    App.HEADER.buttonIconLeft   = App.ICON_HEADER_SQUARE;
    App.HEADER.buttonIconRight1 = App.ICON_HEADER_NONE;    
    App.HEADER.buttonIconRight2 = App.ICON_HEADER_PLUS;


    App.HEADER.onClickButtonLeft   = App.defaultHandler;
    App.HEADER.onClickButtonRight1 = App.defaultHandler;
    App.HEADER.onClickButtonRight2 = App.defaultHandler;

    
    // @ajax - Fetch client data from server
    Api.client.getAll()
        
        .then(clientObjects => {                                    
            clientObjects.forEach((client, i) => {

                let card = new OrdbaseCardClient;
                
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
