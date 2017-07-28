'use strict';

import * as App from './App.js';
import * as Route from '../lib/Route.js';
import { force } from '../lib/Util.js'; 

import { View_SelectClient }      from '../views/select-client.js';
import { Component_ClientCard   } from '../components/card-client.js';

import { loadEditClient }        from './loadEditClient.js';
import { loadNewClient }         from './loadNewClient.js'; 
import { loadSelectTranslation } from './loadSelectTranslation.js';


//
// @function OnloadViewClientSelector
//
export function loadSelectClient() {

    //
    // 0. Create component instances
    //
    const view  = new View_SelectClient;
    const cardArray = new Array;

    //
    // 1. Fire async call
    //
    __async__generateCards({view: view, cardArray: cardArray});

    //
    // 2. Set up header
    //
    App.HEADER.setTextBig         ( 'Ordbase');
    App.HEADER.setTextSmall       ( 'Select Client');

    App.HEADER.setButtonIconLeft  ( App.ICON_SQUARE);
    App.HEADER.setButtonIconRight0( App.ICON_TRASH);
    App.HEADER.setButtonIconRight1( App.ICON_PENCIL);    
    App.HEADER.setButtonIconRight2( App.ICON_PLUS);

    App.HEADER.getButtonLeft().onclick   = App.defaultHandler;    
    App.HEADER.getButtonRight0().onclick = event => { setCardState(cardArray, 'deleteable')};    
    App.HEADER.getButtonRight1().onclick = event => { setCardState(cardArray, 'editable')};
    App.HEADER.getButtonRight2().onclick = event => loadNewClient();

    //
    // 3. Insert new view into DOM
    //
    App.switchView(view);
}


//
// @note the situation going on here with some sort of statehandling is hacky. I would prefer
//        a more clean solution.. TBD what that would be .. - JSolsvik 28.07.17
//
let state = '';
function setCardState(cards, newState) {
    
    state = (state == newState)? '' : newState;

    cards.forEach(card => {

        if (state === 'editable') {
            App.HEADER.textSmall = 'Select Client to Edit';
            card.setState_Editable();
        }
        else if (state === 'deleteable') {
            App.HEADER.textSmall = 'Select Client to Delete';
            card.setState_Deleteable();            
        }
        else {
            App.HEADER.textSmall = 'Select Client';                
            card.setState_Selectable();
        }
    });
}

//
// 4. Generate client cards
//
function __async__generateCards({ 
            view      = force('view'), 
            cardArray = force('cardArray'), 
    }) {

    Route.client_getAll().then(clients => {

        clients.forEach((client, i) => {

            let card = new Component_ClientCard;
            
            card.setId(`card${i}`);
            card.setHeading(client.key);
            card.setText(client.webpageUrl);
            card.setThumbnail(client.thumbnailUrl);

            // @note Duct-typing logic variables, used for later in edit click event
            card.selectHandler = event => loadSelectTranslation(client.key);
            card.editHandler   = event => loadEditClient(client.key);
            card.deleteHandler = event => __async__deleteCard({clientKey: client.key, view: view, card: card});
            
            card.setState_Selectable();

            cardArray.push(card);
            view.appendCard(card);
        });                            
    })
    .catch(reason => console.error('Error:', reason));
}

function __async__deleteCard({
            clientKey = force('clientKey'), 
            view      = force('view'), 
            card      = force('card'),
    }) {

    Route.client_delete(clientKey)
    .then(res => {
        view.root.removeChild(card);
        loadSelectClient();
    })
    .catch(reason => console.error('Error:', reason));
}