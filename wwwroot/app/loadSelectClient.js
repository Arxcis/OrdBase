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

    // Create local variables
    const view  = App.switchView(new View_SelectClient);
    const cards = new Array;

    // Set header data
    App.HEADER.setTextBig         ( 'Ordbase');
    App.HEADER.setTextSmall       ( 'Select Client');
    App.HEADER.setButtonIconLeft  ( App.ICON_SQUARE);
    App.HEADER.setButtonIconRight1( App.ICON_PENCIL);    
    App.HEADER.setButtonIconRight2( App.ICON_PLUS);

    // Set header logic
    App.HEADER.getButtonLeft().onclick   = App.defaultHandler;    
    App.HEADER.getButtonRight1().onclick = event => {
        cards.forEach(card => {
            card.toggleEditable();            

            if (card.isEditable()) {
                App.HEADER.textSmall = 'Select Client to Edit';
                card.setClickHandler(card._handler2);
            } else {
                App.HEADER.textSmall = 'Select Client';                
                card.setClickHandler(card._handler1);
            }
        });
    };
    App.HEADER.getButtonRight2().onclick = event => loadNewClient();


    Api.client.getAll()  
        .then(clients => {                                    
            console.log('getting -> ', clients);
            clients.forEach((client, i) => {

                let card = new Component_CardClient;
                
                card.setId(`card${i}`);
                card.setHeading(client.key);
                card.setText(client.webpageUrl);
                card.setThumbnail(client.thumbnailUrl);

                // @note Duct-typing logic variables, used for later in edit click event
                card._handler1 = event => loadSelectTranslation(client.key);
                card._handler2 = event => loadEditClient(client.key);
                card.setClickHandler(card._handler1);

                cards.push(card);
                view.appendCard(card);
            });                            
        })
        .catch(reason => console.error('Error:', reason))
}
