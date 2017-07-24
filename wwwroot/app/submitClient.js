'use strict';

//
// @module submitClient
// @brief The idea is that this module will take care of logic that is updating the server Create Update and Delete.
//        This is to offload the loadNewClient and loadEditClient scripts, which will then only take care of the Read logic.
//

import * as Api      from '../lib/Api.js';
import { mandatory } from '../lib/Util.js';

export function submitNewClient(form, containers, languages) {


    console.log('Creating new client...')
    Api.client.create(form.getClient())
    .then(response => {
        
        console.log('Creating default containers...');
        Api.client.createDefaultContainers(client, containers);

        console.log('Creating default languages...');
        Api.client.createDefaultLanguages(client, languages);           

    })
    .catch(error => console.log(error));
} 

export function submitEditClient() {}
export function deleteClient()     {}

