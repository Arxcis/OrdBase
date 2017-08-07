'use strict';

import * as App from './App.js';
import * as Route from '../lib/Route.js';
import { force } from  '../lib/Util.js'; 

import { View_SelectClient }      from '../views/select-client.js';
import { Component_ClientCard   } from '../components/card-client.js';
import { Component_Header   }     from '../components/header.js';

import { load_editClient }        from './editClient.js';
import { load_newClient }         from './newClient.js'; 
//import { load_selectTranslation } from './selectTranslation.js';

//
// @function load_selectClient
//
export function load_selectClient() {

    //
    // 0. Create component instances
    //
    const header = new Component_Header;
    const view   = new View_SelectClient;

    //
    // 1. Fire async call
    //
    async_client_getArray({
        header: header,
        success: clientArray => {
            clientArray.forEach((client, i) => {

                let card = new Component_ClientCard;

                card.setKey(client.key);
                card.setHeading(client.key);
                card.setText(client.webpageUrl);
                card.setThumbnail(client.thumbnailUrl);
                
                card.setEventHandlers({
                    onselect: (card, e) => {},//loadSelectTranslation(card.getKey()),
                    onedit:   (card, e) => { load_editClient(card.getKey())},
                });

                card.setSelectable();
                view.addCard(card)
            });                 
        }
    });

    //
    // 3. Set up header event handlers
    //   
    header.setEventHandlers({
        button0_onclick: e => {                         
            let cardArray = view.getCardArray();  
            cardArray.forEach(card => card.setSelectable()); 
            header.setTheme({ textBig: 'Select Client', selectable: true});
        },

        button2_onclick: event => { 

            let cardArray = view.getCardArray();

            if (!cardArray[0].isEditable()) {
                cardArray.forEach(card => card.setEditable());           
                header.setTheme({textBig: 'Edit Client', editable: true});
            }
            else {
                cardArray.forEach(card => card.setSelectable());            
                header.setTheme({textBig: 'Select Client', selectable: true});
            }     
        },

        button3_onclick: e => { load_newClient() },
    });

    //
    // 4. Bind data to header
    //   
    header.setTheme({ textSmall: 'Ordbase', textBig: 'Select Client', selectable: true })
    header.setIcons({
        button0_icon: App.ICON_SQUARE,
        button2_icon: App.ICON_PENCIL,    
        button3_icon: App.ICON_PLUS,
    });

    //
    // 5. Insert new view into DOM
    //
    App.setHeader(header);
    App.switchView(view);
}

//
// @function async_deleteCard
//  @note todo
//
function async_client_getArray({ success = force('success'), header = force('header')}) {

    Route.client_get().then(clientArray => {
        if (clientArray.length > 0)  
            success(clientArray);
        else
            App.flashError('There are no clients to show');
    })
    .catch(err => App.flashError(err));
}