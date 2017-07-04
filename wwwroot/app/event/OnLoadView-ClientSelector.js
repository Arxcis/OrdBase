'use strict';

import { client as clientApi } from '../library/Api.js';
import { swapView }            from '../library/Util.js';
import { OnLoadView_TranslationSelector } from '../event/OnLoadView-TranslationSelector.js';

//
// @function OnLoadViewClientSelector
//
export function OnLoadView_ClientSelector() {
    let view = document.createElement('view-client-selector');
    swapView(view);

    clientApi.getAll()
    .then(data => {

        data.forEach(client => {
            let card = document.createElement('ordbase-card-client');
            view.querySelector('main').appendChild(card);

            card.querySelector('h2').innerHTML = client.name;
            card.querySelector('button').onclick = (event) => OnLoadView_TranslationSelector(client.name);
        });
    })
    .catch(reason => console.error('Error:', reason));

    // Hook up all buttons
    view.querySelector('#btn-toggle-inactive-menu').onclick = (event) => OnLoadView_ClientSelector();
    view.querySelector('#btn-back-to-home-page').onclick    = (event) => OnLoadView_ClientSelector();
    view.querySelector('#btn-create-new-client').onclick    = (event) => OnLoadView_ClientSelector();
}
