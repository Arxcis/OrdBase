'use strict';

import * as api from '/jslib/Api.js';
import { loadSelectClient } from './loadSelectClient.js';
import { submitClient }     from '../OnSubmitForm/submitClient.js';

export function loadEditClient(client) {
    
    //
    // @AJAX - fetch all containers on selected client
    //
    api.container.getOnClient(client).then( containersOnClient => {

        containersOnClient.forEach( container => {

            const containerButton = unpackTemplate(containerButtonTemplate, {
                id : `button-${container}`,
                text : container,
                selected : '',
            }).querySelector('button');

            containerButton.onclick = (event) => event.target.classList.toggle('selected'); 
            containerList.appendChild(containerButton);
        });

        view.querySelector('#list-show-containers-edit-client').appendChild(containerList);

        return api.translation.getGroupOnClient(client);
    })
    .catch(reason => console.error('Error:', reason));
}