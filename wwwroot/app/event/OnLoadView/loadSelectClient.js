'use strict';

import * as api from '../../library/api.js';
import { loadSelectTranslation } from './loadSelectTranslation.js';
import { loadEditClient }        from './loadEditClient.js';

// Cache static element references
const main         = document.body.getElementById('ordbase-main');    
const header       = document.body.getElementById('ordbase-header');

//
// @function OnloadViewClientSelector
//
export function loadSelectClient() {

    // Create elements
    const selectClient = document.createElement('ordbase-select-client');

    // Setup header
    header.textBig      = args.textHeaderBig   || 'Ordbase';
    header.textSmall    = args.textHeaderSmall || 'Select Client';
    header.buttonLeft   = ICON_HEADER_SQUARE;
    header.buttonRight1 = ICON_HEADER_NONE; 
    header.buttonRight2 = ICON_HEADER_PLUS;

    // Batch-update DOM
    main.innerHTML = ''; 
    header.DOMUpdate();
    main.appendChild(selectClient); 

    // @ajax - Fetch client data from server
    api.client.getAll().then(clientObjects => {                             
                            // Inject data into view
                            selectClient.clients = clientObjects;
                            // Update DOM again
                            selectClient.DOMUpdate();
                        })
                        .catch(reason => console.error('Error:', reason))
}
