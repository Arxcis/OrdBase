'use strict';

import * as App from './App.js';
import * as Route from '../lib/Route.js';

import { View_SelectTranslation } from '../views/select-translation.js';

import { Component_ButtonSelect }    from '../components/button-select.js';
import { Component_CardTranslation } from '../components/card-translation.js';
import { Component_GroupKeyIcon }    from '../components/group-key-icon.js';
import { Compnent_ItemGenerator }    from '../components/item-generator.js';

import { loadSelectClient }    from './loadSelectClient.js';

//
// @function loadSelectTranslation
//
export function loadSelectTranslation (clientKey) {

    // Create elements
    const view    = new View_SelectTranslation;
    const button  = new Component_ButtonSelect;
    const generator = new Compnent_ItemGenerator;

    const buttonArray = new Array();
    const cards   = new Array();

    // Async calls
    async_generateSelectButtons(view,  buttonArray, clientKey);
    async_generateTranslationCards(generator, cards, clientKey);
    async_selectButtonHandler(view, clientKey);

    // Setup header
    App.HEADER.setTextBig          ( 'Ordbase');
    App.HEADER.setTextSmall        ( `Select ${clientKey} Translation`);
    App.HEADER.setButtonIconLeft   ( App.ICON_BARS);
    App.HEADER.setButtonIconRight1 ( App.ICON_PLUS);
    App.HEADER.setButtonIconRight2 ( App.ICON_ARROW_LEFT);    

    App.HEADER.getButtonLeft().onclick   = App.defaultHandler;
    App.HEADER.getButtonRight0().onclick = App.defaultHandler;    
    App.HEADER.getButtonRight1().onclick = App.defaultHandler;
    App.HEADER.getButtonRight2().onclick = event => loadSelectClient();

    //
    // Component translation generator
    //
    generator.generateHandler = () => {
        let containerKey   = view.activeContainerButton.getId();
        let translationKey = generator.getValue();
        async_submitNewTranslationGroup(clientKey, containerKey, translationKey);
    };

    generator.destroyHandler = (card) => {

        let containerKey   = view.activeContainerButton.getId();
        let translationKey = card.getKey();

        async_deleteTranslationGroup(clientKey, containerKey, translationKey);
    };

    //
    // Component all containers button
    //
    button.setId('all');
    button.setText('All containers');
    button.setSelected(true);

    view.setTranslationGenerator(generator);
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

function generateTranslationCards(generator, groups) {
            
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
        generator.addItem(card);
    });               
}

function async_generateTranslationCards(generator, cards, clientKey) {

    Route.translation_getGroupMetaAll(clientKey).then(res => {
        generateTranslationCards(generator, res);
    })
    .catch(err => console.error('Error:', err));
}

function async_selectButtonHandler(view, clientKey) {

    view.switchButtonHandler = (newButton, oldButton) => {
        let container = newButton.getId();

        oldButton.setSelected(false);
        newButton.setSelected(true);
        view.activeContainerButton = newButton;

        Route.translation_getGroupMetaOnContainer(clientKey, container).then(groups => {
            view.clearTranslationCards();
        
            generateTranslationCards(view, groups)
        })
        .catch(reason => console.error('Error:', reason));        
    }
}


function async_submitNewTranslationGroup(clientKey, containerKey, translationKey) {}
function async_deleteTranslationGroup(clientKey, containerKey, translationKey)    {}