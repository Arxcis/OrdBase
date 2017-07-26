'use strict';

//
// @module submitClient
// @brief The idea is that this module will take care of logic that is updating the server Create Update and Delete.
//        This is to offload the loadNewClient and loadEditClient scripts, which will then only take care of the Read logic.
//

import * as Api      from '../lib/Api.js';
import { mandatory } from '../lib/Util.js';

import { loadSelectClient } from './loadSelectClient.js';


export function submitUpdateClient(form, containerArray, languageArray) {

    console.log('Updating existing client...');

    Api.client.update(form.getClient()).then(response => {
       
        Api.client.updateDefaultContainers(client, containerArray);
        Api.client.updateDefaultLanguages(client, languageArray);

        loadSelectClient();    
    })
    .catch(error => console.log(error));  // @TODO Display error in view
}
export function deleteClient()     {}

