'use strict';

import * as App from './App.js';
import * as Route from '../lib/Route.js';

import { View_SelectTranslation } from '../views/select-translation.js';

import { Component_ButtonSelect }    from '../components/button-select.js';
import { Component_CardTranslation } from '../components/card-translation.js';
import { Component_GroupKeyIcon }    from '../components/group-key-icon.js';

import { loadNewTranslation }  from './loadNewTranslation.js';
import { loadEditTranslation } from './loadEditTranslation.js';
import { loadSelectClient }    from './loadSelectClient.js';

//
// @function loadSelectTranslation
//
export function loadSelectTranslation (clientKey) {

    // Create elements
    const view    = new View_SelectTranslation;
    const button = new Component_ButtonSelect;
    const buttonArray = new Array();
    const cards   = new Array();

    // Async calls
    async_generateSelectButtons(view,  buttonArray, clientKey);
    async_generateTranslationCards(view, cards, clientKey);
    async_selectButtonHandler(view, clientKey);

    // Setup header
    App.HEADER.setTextBig          ( 'Ordbase');
    App.HEADER.setTextSmall        ( `Select ${clientKey} Translation`);
    App.HEADER.setButtonIconLeft   ( App.ICON_BARS);
    App.HEADER.setButtonIconRight1 ( App.ICON_PLUS);
    App.HEADER.setButtonIconRight2 ( App.ICON_ARROW_LEFT);    

    App.HEADER.getButtonLeft().onclick   = App.defaultHandler;
    App.HEADER.getButtonRight0().onclick = App.defaultHandler;    
    App.HEADER.getButtonRight1().onclick = event => loadNewTranslation(clientKey);
    App.HEADER.getButtonRight2().onclick = event => loadSelectClient();


    button.setId('all');
    button.setText('All containers');
    button.setSelected(true);
    view.setContainerButtonAll(button)

    App.switchView(view);
}


function async_generateSelectButtons(view, buttons, clientKey) {


    Route.client_getDefaultContainers(clientKey)  
    .then(containers => {        
        containers.forEach((container, i) => {

            let button = new Component_ButtonSelect;

            button.setId( container);
            button.setText( container);
            button.setSelected(false)
        
            view.addContainerButton(button);    
        });
    })
}

function generateTranslationCards(view, groups) {
            
    groups.forEach((group, i) => {

        let card = new Component_CardTranslation;
        
        card.key = group.key;
        card.onClickCard = event => loadEditTranslation(client, group.key);

        Object.keys(group.isComplete).forEach((languageKey, isComplete) => {
            
            let keyAndIcon = new Component_GroupKeyIcon;

            keyAndIcon.languageKey = languageKey;
            keyAndIcon.icon = (isComplete) ? App.ICON_CHECK : App.ICON_TIMES;

            card.appendKeyAndIcon(keyAndIcon);
        });
        view.addTranslationCard(card);
    });               
}

function async_generateTranslationCards(view, cards, clientKey) {

    Route.translation_getGroupMetaAll(clientKey).then(res => {
        generateTranslationCards(view, res);
    })
    .catch(err => console.error('Error:', err));
}

function async_selectButtonHandler(view, clientKey) {

    view.switchButtonHandler = (newButton, oldButton) => {
        let container = newButton.getId();

        oldButton.setSelected(false);
        newButton.setSelected(true);
        view.selectedButton = newButton;

        Route.translation_getGroupMetaOnContainer(clientKey, container).then(groups => {
            view.clearTranslationCards();
        
            generateTranslationCards(view, groups)
        })
        .catch(reason => console.error('Error:', reason));        
    }
}
