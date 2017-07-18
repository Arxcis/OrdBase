'use strict';

import * as App from '/app/App.js';
import * as Api from '/jslib/Api.js';

import { loadSelectClient } from './loadSelectClient.js';
import { submitClient }     from '../OnSubmitForm/submitClient.js';

export function loadEditClient(client) {
    
    App.header.textBig   = 'Ordbase';    
    App.header.textSmall = 'Edit client';
    App.header.buttonIconLeft   = ICON_HEADER_BARS;
    App.header.buttonIconRight1 = ICON_HEADER_NONE;    
    App.header.buttonIconRight2 = ICON_HEADER_TIMES;

    App.header.onClickButtonLeft   = App.defaultHandler;
    App.header.onClickButtonRight1 = App.defaultHandler;
    App.header.onClickButtonRight2 = App.defaultHandler;

    const viewEditClient = document.createElement('edit-client');    
    App.main.innerHTML = '';
    App.main.appendChild(viewEditClient);

    Api.container.getOnClient(client).then( containersOnClient => {

        containersOnClient.forEach( container => {

            const buttonContainer

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