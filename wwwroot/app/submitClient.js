'use strict';

import * as Api      from '../jslib/Api.js';
import { mandatory } from '../jslib/Util.js';

export function submitNewClient({
                        form       = mandatory(), 
                        containers = mandatory(), 
                        languages  = mandatory()} =  mandatory()) {
    
    const client = {
        Name         : form.getName(),
        WebpageUrl   : form.getWebpageUrl(),
        ThumbnailUrl : form.getThumbnailUrl(),
        ApiKey       : form.getApiKey(),
    }

    console.log('Creating new client...')
    Api.client.create(client)
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

