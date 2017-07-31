'use strict';

import * as App from './App.js';
import * as Route from '../lib/Route.js';
import { force } from  '../lib/Util.js'; 

import { View_SelectClient }      from '../views/select-client.js';
import { Component_ClientCard   } from '../components/card-client.js';

//import { loadEditClient }        from './loadEditClient.js';
//import { loadNewClient }         from './loadNewClient.js'; 
//import { loadSelectTranslation } from './loadSelectTranslation.js';

//
// @function OnloadViewClientSelector
//
export function loadSelectClient() {

    //
    // 0. Create component instances
    //
    const header        = App.HEADER;
    const view          = new View_SelectClient;
    const cardPrototype = new Component_ClientCard;

    //
    // 1. Fire async call
    //
    __async__generateCards({view: view, cardPrototype: cardPrototype});

    //
    // 2. Set up card prototype event handlers
    //
    cardPrototype.OnSelect( e => {});//loadSelectTranslation(e.target.getKey()) );
    cardPrototype.OnEdit( e => {});//loadEditClient(e.target.getKey()));
    cardPrototype.OnDelete( e => __async__deleteCard({ clientKey: e.target.getKey(), 
                                                       header: header, 
                                                       view: view, 
                                                       card: e.target }));
    //
    // 3. Set up header event handlers
    //   
    header.button0_OnClick(App.defaultHandler);     
    header.button1_OnClick(event => { 

        let cardArray = view.getCardArray();

        if (!cardArray[0].isDeleteable()) {
            header.setTextBig('Delete Client');
            header.setColor(App.COLOR_DANGER);  
            cardArray.forEach(card => card.setDeleteable());          
        }
        else { 
            header.setTextBig('Select Client');
            header.setColor(App.COLOR_SUCCESS);
            cardArray.forEach(card => card.setSelectable());
        }   
    });    

    header.button2_OnClick(event => { 

        let cardArray = view.getCardArray();
        console.log(cardArray);
        if (!cardArray[0].isEditable()) {
            header.setTextBig('Edit Client');
            header.setColor(App.COLOR_SELECT); 
            cardArray.forEach(card => card.setEditable());           
        }
        else {
            header.setTextBig('Select Client'); 
            header.setColor(App.COLOR_SUCCESS);
            cardArray.forEach(card => card.setSelectable());            
        }     
    });

    header.button3_OnClick(event => {});//loadNewClient());

    //
    // 3. Bind data to header
    //   
    header.setTextSmall( 'Ordbase');
    header.setTextBig( 'Select Client');

    header.setColor(App.COLOR_SUCCESS);
    header.button0_setIcon(App.ICON_SQUARE);
    header.button1_setIcon(App.ICON_TRASH);
    header.button2_setIcon(App.ICON_PENCIL);    
    header.button3_setIcon(App.ICON_PLUS);


    //
    // 4. Insert new view into DOM
    //
    App.switchView(view);
}

//
// @function __async__deleteCard
//  @note todo
//
function __async__generateCards({ 
            view          = force('view'), 
            cardPrototype = force('cardPrototype'), 
    }) {

    Route.client_get().then(clients => {

        clients.forEach((client, i) => {

            let card = cardPrototype.cloneNode(true);

            card.setId(`card${i}`);
            card.setHeading(client.key);
            card.setText(client.webpageUrl);
            card.setThumbnail(client.thumbnailUrl);

            view.addCard(card)
        });                            
    })
    .catch(reason => console.error('Error:', reason));
}

//
// @function __async__deleteCard
//  @note todo
//
function __async__deleteCard({
            view      = force('view'), 
            header    = force('header'),             
            card      = force('card'),
    }) {

    Route.client_delete({clientKey: card.getKey()})
    .then(res => {
        if (res.status == 205) {
            view.root.removeChild(card);
        }
        else {
            header.flashError('${res.status}: Card not deleted');
        }
        loadSelectClient();
    })
    .catch(reason => console.error('Error:', reason));
}