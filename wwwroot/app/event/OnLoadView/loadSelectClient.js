'use strict';

import * as api from '../../library/api.js';
import { loadSelectTranslation } from './loadSelectTranslation.js';
import { loadEditClient }        from './loadEditClient.js';

//
// @function OnloadViewClientSelector
//
export function loadSelectClient() {
    
    const view = unpackTemplate(viewTemplate, {
        bigHeader : 'Ordbase',
        smallHeader : 'Select client',
    });

    // Get Client data
    api.client.getAll().then(clientCollection => {

        // Loop through all clients and generate cards for each of thems
        const main = view.querySelector('main');

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
