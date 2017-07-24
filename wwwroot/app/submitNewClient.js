'use strict';

import * as Api from '../jslib/Api.js';

export function submitNewClient(form, containers, languages) {
    
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
        .catch(failure => console.log(failure));
} 