'use strict';

import * as Api from '../jslib/Api.js';

export function submitNewClient(selectedContainers, selectedLanguages, form) {
    
    const client = {
        Name         : form.getName(),
        WebpageUrl   : form.getWebpageUrl(),
        ThumbnailUrl : form.getThumbnailUrl(),
        ApiKey       : form.getApiKey(),
    }

    Api.createClient(client)
        .then()
} 