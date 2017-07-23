'use strict';

import * as App from './App.js';
import * as Api from '../jslib/Api.js'; 

// View and components
import { Ordbase_EditTranslation }     from '../components/views/edit-translation.js';
import { Ordbase_ButtonSelect }     from '../components/lib/button-select.js';
import { Ordbase_FieldsetTranslation } from '../components/lib/fieldset-translation.js';

// Event handlers
import { loadSelectTranslation }      from './loadSelectTranslation.js';
import { loadSelectClient }           from './loadSelectClient.js';

//
// @function loadEditTranslation
//
export function loadNewTranslation (client) {

    const view = App.switchView(new Ordbase_EditTranslation);

    App.HEADER.textBig          = 'Ordbase';
    App.HEADER.textSmall        = 'New translation';

    App.HEADER.buttonIconLeft   = App.ICON_BARS;
    App.HEADER.buttonIconRight1 = App.ICON_NONE;    
    App.HEADER.buttonIconRight2 = App.ICON_TIMES;
    
    App.HEADER.buttonLeft.onclick   = App.defaultHandler;
    App.HEADER.buttonRight1.onclick = App.defaultHandler;
    App.HEADER.buttonRight2.onclick = event => loadSelectTranslation(client);
}
