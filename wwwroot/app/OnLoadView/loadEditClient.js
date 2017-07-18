'use strict';

import * as App from '/app/App.js';
import * as Api from '/jslib/Api.js';

import { loadSelectClient } from './loadSelectClient.js';
import { submitClient }     from '../OnSubmitForm/submitClient.js';

import { OrdbaseEditClient } from '/components/view/edit-client';

export function loadEditClient(client) {
    
    const view = document.createElement('edit-client');    
    App.main.innerHTML = '';
    App.main.appendChild(view);

    App.header.textBig   = 'Ordbase';    
    App.header.textSmall = 'Edit client';
    App.header.buttonIconLeft   = ICON_HEADER_BARS;
    App.header.buttonIconRight1 = ICON_HEADER_NONE;    
    App.header.buttonIconRight2 = ICON_HEADER_TIMES;

    App.header.onClickButtonLeft   = App.defaultHandler;
    App.header.onClickButtonRight1 = App.defaultHandler;
    App.header.onClickButtonRight2 = App.defaultHandler;


    Api.container.getOnClient(client)
        .then( containersOnClient => {

            containersOnClient.forEach( container => {

                const button = view.cloneButtonContainer();

                button.id = `button-${container}`;
                button.text  = container;
                button.selected = '';

                view.appendButtonContainer(button);
            });
        })
        .catch(reason => console.error('Error:', reason));
}