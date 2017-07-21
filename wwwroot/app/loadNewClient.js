'use strict';

import * as App from './App.js';
import * as Api from '../jslib/Api.js';

import { Ordbase_ItemGenerator }   from '../components/lib/item-generator'
import { Ordbase_ButtonContainer } from '../components/lib/button-container';
import { Ordbase_EditClient }      from '../components/views/edit-client';


import { loadSelectClient } from './loadSelectClient.js';

export function loadNewClient(client) {

    App.HEADER.textBig   = 'Ordbase';    
    App.HEADER.textSmall = 'New client';
    App.HEADER.buttonIconLeft   = App.ICON_BARS;
    App.HEADER.buttonIconRight1 = App.ICON_NONE;    
    App.HEADER.buttonIconRight2 = App.ICON_TIMES;

    App.HEADER.buttonLeft.onclick   = App.defaultHandler;
    App.HEADER.buttonRight1.onclick = App.defaultHandler;
    App.HEADER.buttonRight2.onclick = event => loadSelectClient();

    const view               = new Ordbase_EditClient;    
    const containerGenerator = new Ordbase_ItemGenerator;        
    containerGenerator.heading = 'Container'; 

    view.appendMenuItem(containerGenerator);
    
    App.MAIN.innerHTML = '';
    App.MAIN.appendChild(view);
}