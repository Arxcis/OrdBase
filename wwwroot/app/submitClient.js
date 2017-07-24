'use strict';

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

