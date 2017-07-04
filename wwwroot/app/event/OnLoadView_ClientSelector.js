'use strict';

import { client as APIClient } from '../library/api.js';
import { overwriteFromTemplate, appendFromTemplate } from '../library/util.js';
import { OnLoadView_TranslationSelector } from './OnLoadView-TranslationSelector.js';
import { OnLoadView_ClientEditor } from './OnLoadView_ClientEditor.js';

//
// @function OnLoadViewClientSelector
//
export function OnLoadView_ClientSelector() {
    const view = overwriteFromTemplate(document.body, 'view-client-selector');

    APIClient.getAll()
    .then(data => {

        data.forEach(client => {

            const card = appendFromTemplate(view.querySelector('main'), 'ordbase-card-client');

            card.querySelector('h2').innerHTML = client.name;
            card.querySelector('button').onclick = (event) => OnLoadView_TranslationSelector(client.name);
        });
    })
    .catch(reason => console.error('Error:', reason));

    // Hook up all buttons
    view.querySelector('#btn-toggle-inactive-menu').onclick = (event) => OnLoadView_ClientSelector();
    view.querySelector('#btn-back-to-home-page').onclick    = (event) => OnLoadView_ClientSelector();
    view.querySelector('#btn-create-new-client').onclick    = (event) => OnLoadView_ClientEditor();
}
