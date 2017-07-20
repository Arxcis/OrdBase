'use strict';

import * as App from '../App.js';
import * as Api from '../../jslib/Api.js';

import { Ordbase_ButtonContainer } from '../../components/lib/button-container';
import { Ordbase_EditClient } from '../../components/views/edit-client';

import { loadSelectClient } from './loadSelectClient.js';
import { submitClient }     from '../OnSubmitForm/submitClient.js';


export function loadEditClient(client) {
    
    const view = new Ordbase_EditClient;
    App.MAIN.innerHTML = '';
    App.MAIN.appendChild(view);

    App.HEADER.textBig   = 'Ordbase';    
    App.HEADER.textSmall = 'Edit client';
    App.HEADER.buttonIconLeft   = App.ICON_BARS;
    App.HEADER.buttonIconRight1 = App.ICON_NONE;    
    App.HEADER.buttonIconRight2 = App.ICON_TIMES;

    App.HEADER.onClickButtonLeft   = App.defaultHandler;
    App.HEADER.onClickButtonRight1 = App.defaultHandler;
    App.HEADER.onClickButtonRight2 = event => loadSelectClient();


    Api.container.getOnClient(client='')
        .then( containersOnClient => {

            containersOnClient.forEach( container => {

                const button = new Ordbase_ButtonContainer;

                button.id = `button-${container}`;
                button.text  = container;
                button.selected = '';

                view.appendButtonContainer(button);
            });
        })
        .catch(reason => console.error('Error:', reason));
}