'use strict';

import * as api from '../../library/api.js';
import { loadSelectTranslation } from './loadSelectTranslation.js';
import { loadEditClient }        from './loadEditClient.js';

//
// @function OnloadViewClientSelector
//
export function loadSelectClient() {

    // Do DOM stuff
    const main   = document.getElementById('ordbase-main');    
    const header = document.getElementById('ordbase-header');
    const selectClientElement = document.createElement('ordbase-select-client');
    const cardClientElement   = document.createElement('ordbase-card-client');

    // Setup header
    header.textBig      = args.textHeaderBig   || 'Ordbase';
    header.textSmall    = args.textHeaderSmall || 'Select Client';
    header.buttonLeft   = ICON_HEADER_SQUARE;
    header.buttonRight1 = ICON_HEADER_NONE; 
    header.buttonRight2 = ICON_HEADER_PLUS;
    header.render();

    // Setup select client view
    

    // Get Client data
    api.client.getAll().then(clientCollection => {

        // Loop through all clients and generate cards for each of thems

        clientCollection.forEach((client, index) => {
    
            const cardContent = unpackTemplate(cardTemplate, {
                id:         `card${index}`,
                name:       client.name,
                website:    'https://www.placeholder.no',
                thumbnail : 'http://placehold.it/250x125/FFC107', 
            });

            cardContent.querySelector('button').addEventListener('click', event => loadSelectTranslation(client.name));            
            main.appendChild(cardContent);            
        });      
    })
    .catch(reason => console.error('Error:', reason))
    .then(() => {                                  
        // Clear all previous content, insert new view
        document.body.innerHTML = ''; 
        document.body.appendChild(view);
    });
}
