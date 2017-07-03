'use strict';

import { client as clientApi } from '../Api';
import { swapView }            from '../Util';

//
// @function OnLoadViewClientSelector
//
function OnLoad_ViewClientSelector() {
    let view = document.createElement('view-client-selector');
    Util.swapView(view);

    API
    .client.getAll()
    .then(data => {

        data.forEach(client => {
            let card = document.createElement('ordbase-card-client');
            view.querySelector('main').appendChild(card);

            card.querySelector('h2').innerHTML = client.name;
            card.querySelector('button').onclick = (event) => OnLoad_ViewTranslationSelector(client.name);
        });
    })
    .catch(reason => console.error('Error:', reason));

    // Hook up all buttons
    view.querySelector('#btn-toggle-inactive-menu').onclick = (event) => OnLoad_ViewClientSelector();
    view.querySelector('#btn-back-to-home-page').onclick    = (event) => OnLoad_ViewClientSelector();
    view.querySelector('#btn-create-new-client').onclick    = (event) => OnLoad_ViewClientSelector();
}
