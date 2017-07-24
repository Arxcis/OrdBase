'use strict';

import * as App from './App.js';
import * as Api from '../lib/Api.js';

import { View_EditClient }        from '../views/edit-client.js';

import { Component_ButtonSelect } from '../components/button-select.js';

import { loadSelectClient } from './loadSelectClient.js';


export function loadEditClient(client) {
    
    App.HEADER.textBig   = 'Ordbase';    
    App.HEADER.textSmall = 'Edit client';

    App.HEADER.buttonIconLeft   = App.ICON_BARS;
    App.HEADER.buttonIconRight1 = App.ICON_NONE;    
    App.HEADER.buttonIconRight2 = App.ICON_TIMES;

    App.HEADER.buttonLeft.onclick   = App.defaultHandler;
    App.HEADER.buttonRight1.onclick = App.defaultHandler;
    App.HEADER.buttonRight2.onclick = event => loadSelectClient();

    const view = App.switchView(new View_EditClient);

    Api.container.getOnClient(client='')
        .then( containersOnClient => {

            containersOnClient.forEach( container => {

                const button = new Component_ButtonSelect;

                button.id = `button-${container}`;
                button.text  = container;
                button.selected = '';

                view.appendButtonContainer(button);
            });
        })
        .catch(reason => console.error('Error:', reason));
}